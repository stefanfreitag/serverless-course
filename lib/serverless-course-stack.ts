import cdk = require("@aws-cdk/cdk");

import { User, Policy, CfnAccessKey, Role, ServicePrincipal } from "@aws-cdk/aws-iam";
import { Bucket, EventType } from '@aws-cdk/aws-s3';
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


    const role = new Role(this, 'ImageResizingLambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: 'lambda_s3_execution',
    });
    role.attachManagedPolicy('arn:aws:iam::aws:policy/AmazonS3FullAccess');

    const srcBucket = new Bucket(this,'ImageResizeSourceBucket', {
        bucketName: 'de.freitag.stefan.imageresize'
    });
    // TODO: srcBucket.addEventNotification(EventType.ObjectCreatedPut, )

    const destinationBucket = new Bucket(this,'ImageResizeDestinationBucket', {
      bucketName: 'de.freitag.stefan.imageresize-dest'
  });

  }


}
