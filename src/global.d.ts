import React from "react";

declare module '*.pug' {
  const template: (params?: { [key: string]: any }) => React.ReactElement;
  export = template;
}