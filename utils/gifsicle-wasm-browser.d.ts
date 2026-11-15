declare module 'gifsicle-wasm-browser' {
  const gifsicle: {
    run(options: {
      input: { file: Blob; name: string }[];
      command: string[];
      isStrict?: boolean;
    }): Promise<File[]>;
  };
  export default gifsicle;
}
