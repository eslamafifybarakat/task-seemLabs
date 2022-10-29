export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    "--text-main-color": " #6C63FF",
    "--bg-main-color": " #6C63FF",
  },
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--text-main-color": " #000",
    "--bg-main-color": " #000",
  }
}
