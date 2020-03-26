#!/usr/bin/env node
import 'source-map-support/register';
import { ServerlessCourseStack } from '../lib/serverless-course-stack';
import { App } from '@aws-cdk/core';

const app = new App();
new ServerlessCourseStack(app, 'ServerlessCourseStack');
