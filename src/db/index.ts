import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const getDb = () => {
  // This gets the 'DB' binding we defined in wrangler.toml
  const { env } = getCloudflareContext();
  return drizzle(env.DB);
};
