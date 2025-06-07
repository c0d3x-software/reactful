
declare global {
   interface Status {
      debug: boolean;
      build: boolean;
      serve: boolean;
      fails: boolean;
   }
}

export const status = {
   debug: false,
   build: false,
   serve: false,
   fails: false
}