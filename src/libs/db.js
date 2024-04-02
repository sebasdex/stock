import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: "viaduct.proxy.rlwy.net",
    user: "root",
    password: "devdgPMbCmcKcquqfqsWmSnPpfZVfXSy",
    port: 53950,
    database: "railway",
  },
});
