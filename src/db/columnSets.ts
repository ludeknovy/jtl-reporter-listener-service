import * as pgp from "pg-promise"
const pg = pgp()

export const SamplesColumnSet = new pg.helpers.ColumnSet([
  "elapsed", "success", "bytes", "label",
  {
    name: "timestamp",
    prop: "timeStamp",
  },
  {
    name: "sent_bytes",
    prop: "sentBytes",
    def: null,
  },
  {
    name: "connect",
    prop: "connect",
  }, {
    name: "hostname",
    prop: "hostname",
    def: null,
  }, {
    name: "status_code",
    prop: "responseCode",
  },
  {
    name: "all_threads",
    prop: "allThreads",
  },
  {
    name: "grp_threads",
    prop: "grpThreads",
  }, {
    name: "latency",
    prop: "latency",
  },
  {
    name: "response_message",
    prop: "responseMessage",
  },
  {
    name: "item_id",
    prop: "itemId",
  },
  {
    name: "sut_hostname",
    prop: "sutHostname",
    def: null,
  },
  {
    name: "failure_message",
    prop: "failureMessage",
    def: null,
  },
], { table: new pg.helpers.TableName({ table: "samples", schema: "jtl" }) })

export const MonitorColumnSet = new pg.helpers.ColumnSet([
  "timestamp", "name", "cpu", {
    name: "item_id",
    prop: "itemId",
  },
], { table: new pg.helpers.TableName({ table: "monitor", schema: "jtl" }) })
