#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { ServerlessCourseStack } from '../lib/serverless-course-stack';

const app = new cdk.App();
new ServerlessCourseStack(app, 'ServerlessCourseStack');
