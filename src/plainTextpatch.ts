// https://github.com/replugged-org/replugged/blob/eab9cd21d08e71c32c167d98c4e297c07d51a051/src/renderer/coremods/contextMenu/plaintextPatches.ts
// This is temporary until replugged adds api for context menu's

export default [
  {
    replacements: [
      {
        match: /(function [\w$]+\((\w)\){)(var \w,\w=.\.navId)/,
        replace: `$1window.replugged.plugins.getExports('dev.wolfplugs.Guild-Profile')?.guildMenu($2);$3`,
      },
    ],
  },
  {
    replacements: [
      {
        match: /(navId:[\w"-]+,)/g,
        replace: `$1data:arguments,`,
      },
    ],
  },
];
