import React, { useEffect, useState } from "react";
import fetch from "cross-fetch";
import { Typography } from "@mui/material";
import { isBlock } from "@babel/types";

type Props = {
  url: string;
};

type Loader = {
  show: boolean;
  msg: string;
};

type Block = {
  text: string;
  id: number;
};

const Blocks: React.FC<Props> = ({ url }) => {
  const [loader, setLoader] = useState<Loader>({
    show: false,
    msg: "",
  });

  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    setLoader({ show: true, msg: "Loading data..." });

    const getBlocks = async (url: string) => {
      try {
        const response = await fetch(`${url}/api/v1/blocks`);
        const objectData = await response.json();
        // console.log(objectData);
        setBlocks(
          objectData.data.reduce((acc: Block[], cur: any) => {
            acc.push({ text: cur.attributes.data, id: cur.id });
            return acc;
          }, [])
        );
        setLoader({ show: false, msg: "" });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };

    getBlocks(url);
  }, [url]);

  return (
    <>
      {loader.show ? (
        <Typography> {loader.msg} </Typography>
      ) : (
        blocks.map((block) => {
          return (
            <div key={block.id} className="dataBlock">
              <Typography className="id">
                {" "}
                {block.id.toString().padStart(3, "0")}{" "}
              </Typography>
              <Typography> {block.text} </Typography>
            </div>
          );
        })
      )}
    </>
  );
};

export default Blocks;
