
import { User, CfnAccessKey, Role, ServicePrincipal, ManagedPolicy } from "@aws-cdk/aws-iam";
import { Bucket } from "@aws-cdk/aws-s3";
import { Table, Attribute, AttributeType, ProjectionType } from "@aws-cdk/aws-dynamodb";
import { CfnOutput, PhysicalName, Stack, Construct, StackProps } from "@aws-cdk/core";
export class ServerlessCourseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const user = new User(this, "serverless-admin-user", {
      userName: "serverless-admin"
    });
    
    user.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"));
    const accessKey = new CfnAccessKey(this, "myAccessKey", {
      userName: user.userName
    });

    new CfnOutput(this, "accessKeyId", { value: accessKey.userName});
    new CfnOutput(this, "secretAccessKey", {
      value: accessKey.attrSecretAccessKey
    });

    const role = new Role(this, "ImageResizingLambdaRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      roleName: "lambda_s3_execution"
    });
    role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"));

    const srcBucket = new Bucket(this, "ImageResizeSourceBucket", {
      bucketName: "de.freitag.stefan.imageresize"
        });
    // TODO: srcBucket.addEventNotification(EventType.ObjectCreatedPut, )

    const destinationBucket = new Bucket(this, "ImageResizeDestinationBucket", {
      bucketName: "de.freitag.stefan.imageresize-dest"
    });

    const table = new Table(this, "Table", {
      tableName: "td_notes",
      partitionKey: { name: "user_id", type: AttributeType.STRING },
      sortKey: { name: "timestamp", type: AttributeType.NUMBER },
      
    });
   /**  table.addLocalSecondaryIndex({
      indexName: "user_id-title-index",
      
      projectionType: ProjectionType.All
    })
    */
  }
}
