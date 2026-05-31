import rehypePrettyCode from "rehype-pretty-code";
import type { MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { mdxComponents } from "@/mdx-components";

export { mdxComponents };

export const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark-dimmed",
          keepBackground: false,
          defaultLang: {
            block: "txt",
            inline: "txt",
          },
        },
      ],
    ],
  },
} satisfies MDXRemoteOptions;
