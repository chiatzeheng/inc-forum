import type { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { ResponseHeadersPolicy } from "aws-cdk-lib/aws-cloudfront";

export default {
  config(_input) {
    return {
      name: "discussion-forum-inc-research-proj",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.setDefaultRemovalPolicy("destroy");
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
        },
        cdk: {
          responseHeadersPolicy: ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS,
        },
        warm: 20,

      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
