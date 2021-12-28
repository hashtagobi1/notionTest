import endpoints from "./endpoints.config";
const { Client } = require("@notionhq/client");
import axios from "axios";
interface tableProps {
  title: string;
  description: string;
  discord_name: string;
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getTags() {
  const db = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  // console.log(notionPropsByID(db.properties));
}

getTags();

function notionPropsByID(properties: any) {
  return Object.values(properties).reduce((obj: any, property: any) => {
    // console.log("Obj", obj);
    // console.log("Prop", property);
    const { id, ...rest } = property;

    return { ...obj, [id]: rest };
  }, {});
}

const createSuggestion = async ({
  title,
  description,
  discord_name,
}: tableProps) => {
  // const NOTION_TITLE_ID =
  //   endpoints.NOTION_TITLE_ID && (await axios.get(endpoints.NOTION_TITLE_ID));

  // const NOTION_DESC_ID =
  //   endpoints.NOTION_DESC_ID && (await axios.get(endpoints.NOTION_DESC_ID));

  notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      // ! use env variables
      [process.env.NOTION_TITLE_ID!]: {
        title: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
      },
      // ! use env variables
      [process.env.NOTION_DESC_ID!]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: description,
            },
          },
        ],
      },
      [process.env.NOTION_NAME_ID!]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: discord_name,
            },
          },
        ],
      },
    },
  });
};

// function getSuggestion async(){
//   const notionPages = await notion.databases.query({
// database_id: process.env.NOTION_DATABASE_ID,
// sorts:[{
//   property:process.env.NOTION_VOTES_ID,
//   direction:"descending"
// }]
//   })

//   return fromNotionObject(notionPages)
// }

// function fromNotionObject(){

// }

module.exports = {
  createSuggestion,
  getTags,
};
