import cdk = require("@aws-cdk/cdk");

import { User, Policy, CfnAccessKey } from "@aws-cdk/aws-iam";
import { CfnOutput } from "@aws-cdk/cdk";
export class ServerlessCourseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const user = new User(this, "serverless-admin-user", {
      userName: "serverless-admin"
    });
    user.attachManagedPolicy("arn:aws:iam::aws:policy/AdministratorAccess");
    const accessKey = new CfnAccessKey(this, "myAccessKey", {
      userName: user.userName
    });

    new CfnOutput(this, "accessKeyId", { value: accessKey.accessKeyId });
    new CfnOutput(this, "secretAccessKey", {
      value: accessKey.accessKeySecretAccessKey
    });
  }
}
