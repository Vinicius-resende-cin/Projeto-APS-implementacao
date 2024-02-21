import axios from "axios";
import { createHash, createHmac } from "crypto";
import Notifier from "../models/notification";
import * as dotenv from "dotenv";
import User from "../models/user";
import Order from "../models/order";

dotenv.config({ path: require.main === module ? "../.env" : "./src/.env" });
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

// Implementação da classe base
export class ConcreteNotifier implements Notifier {
  messageConfiguration = {};
  addresses = {};
  private accessKeyId = AWS_ACCESS_KEY_ID;
  private secretAccessKey = AWS_SECRET_ACCESS_KEY;

  generateAwsSignature(
    secretKey: string,
    dateStamp: string,
    region: string,
    serviceName: string,
    stringToSign: string
  ): string {
    const sign = (key: Buffer, msg: string): Buffer => createHmac("sha256", key).update(msg, "utf8").digest();
    const secret = Buffer.from("AWS4" + secretKey, "utf8");
    const dateKey = sign(secret, dateStamp);
    const dateRegionKey = sign(dateKey, region);
    const dateRegionServiceKey = sign(dateRegionKey, serviceName);
    const signingKey = sign(dateRegionServiceKey, "aws4_request");
    return sign(signingKey, stringToSign).toString("hex");
  }

  send() {
    const region = "us-east-1";

    const endpoint = `https://pinpoint.${region}.amazonaws.com/v1/apps/2389a017bb2e44c3bef79967b4c78965/messages`;

    const currentDateTime = new Date();
    const dateStamp = currentDateTime.toISOString().slice(0, 10).replace(/-/g, "");
    const amzDate = currentDateTime.toISOString().replace(/[:-]/g, "").split(".")[0] + "Z";

    const payload = {
      Addresses: this.addresses,
      MessageConfiguration: this.messageConfiguration
    };

    const payloadHash = createHash("sha256").update(JSON.stringify(payload)).digest("hex");
    const canonicalRequest = `POST\n/v1/apps/2389a017bb2e44c3bef79967b4c78965/messages\n\ncontent-type:application/json\nhost:pinpoint.${region}.amazonaws.com\nx-amz-date:${amzDate}\n\ncontent-type;host;x-amz-date\n${payloadHash}`;
    const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${dateStamp}/${region}/mobiletargeting/aws4_request\n${createHash(
      "sha256"
    )
      .update(canonicalRequest, "utf8")
      .digest("hex")}`;

    const signature = this.generateAwsSignature(
      this.secretAccessKey,
      dateStamp,
      region,
      "mobiletargeting",
      stringToSign
    );

    const headers = {
      "Content-Type": "application/json",
      "X-Amz-Date": amzDate,
      Authorization: `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${dateStamp}/${region}/mobiletargeting/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=${signature}`
    };

    axios
      .post(endpoint, payload, { headers })
      .then((response) => {
        console.log("Mensagem enviada com sucesso. ID da mensagem:", response.data.MessageId);
      })
      .catch((error) => {
        console.log("Erro ao enviar a mensagem:", error);
      });
  }
}

export class Decorator implements Notifier {
  protected notifier: Notifier;
  messageConfiguration: object;
  addresses: object;
  constructor(source: Notifier) {
    this.notifier = source;
    this.messageConfiguration = source.messageConfiguration;
    this.addresses = source.addresses;
  }

  send(...args: any[]): void {
    this.notifier.send();
  }
}

// Implementação do decorator
export class ConcreteDecoratorEmail extends Decorator {
  send(
    title: string,
    textMessage: string,
    htmlMessage: string,
    addresses: string[],
    addressesData: object
  ): void {
    this.notifier.messageConfiguration["EmailMessage"] = {
      SimpleEmail: {
        Subject: { Data: title, Charset: "UTF-8" },
        TextPart: { Data: textMessage, Charset: "UTF-8" },
        HtmlPart: { Data: htmlMessage, Charset: "UTF-8" }
      }
    };
    this.notifier.addresses = {
      ...this.notifier.addresses,
      ...addresses.reduce((obj, address) => {
        if (address in addressesData) {
          obj[address] = {
            ChannelType: "EMAIL",
            Substitutions: addressesData[address] || {}
          };
        } else {
          obj[address] = {
            ChannelType: "EMAIL"
          };
        }
        return obj;
      }, {})
    };
    console.log("addresses:", this.notifier.addresses);
    console.log("messageConfiguration:", this.notifier.messageConfiguration);
    super.send();
  }
}

// Possível implementação do decorator para envio de SMS.
// class ConcreteDecoratorSMS extends Decorator {
//     send(toAddresses, ccAddresses=[]): void {
//         this.notifier.payload = {
//             // Modifica payload
//         }

//         super.send();
//     }
// }

export function orderStatusChange(user: User, order: Order) {
  const concreteNotifier: Notifier = new ConcreteNotifier();
  const emailDecoratedNotifier: Decorator = new ConcreteDecoratorEmail(concreteNotifier);

  const addresses = [user.email];
  const addressesData = {
    [`${user.email}`]: {
      "user.name": [user.name],
      "order.id": [order.id],
      "order.status": [order.status]
    }
  };

  const textMessage =
    "Olá, {{user.name}}, seu pedido {{order.id}} teve status alterado para {{order.status}}.";
  const htmlMessage =
    "Olá, {{user.name}}, seu pedido {{order.id}} teve status alterado para {{order.status}}.";
  const title = "Pedido alterado";

  emailDecoratedNotifier.send(title, textMessage, htmlMessage, addresses, addressesData);
}

// // Teste de utilização do decorator
// if (require.main === module) {
//     const concreteNotifier: Notifier = new ConcreteNotifier();
//     const emailDecoratedNotifier: Decorator = new ConcreteDecoratorEmail(concreteNotifier)
//     const addresses = ["dgsv@cin.ufpe.br"]
//     const addressesData = {
//         "dgsv@cin.ufpe.br": {
//             "user.name": ["Dário Vasconcelos"],
//             "order.id": [123456],
//             "order.status": ["delivered"]
//         }
//     }
//     const textMessage = "Olá, {{user.name}}, seu pedido {{order.id}} teve status alterado para {{order.status}}."
//     const htmlMessage = "Olá, {{user.name}}, seu pedido {{order.id}} teve status alterado para {{order.status}}."
//     const title = "Pedido alterado"
//     emailDecoratedNotifier.send(title, textMessage, htmlMessage, addresses, addressesData)
// }
