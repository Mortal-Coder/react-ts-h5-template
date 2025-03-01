interface TreeNode {
  [key: string]: unknown;
}

export const treeToList = (list: TreeNode[], parents: string | string[]) => {
  let adtaList: TreeNode[] = [];
  list.forEach((v) => {
    if (typeof parents === 'string') {
      if (v[parents]) {
        adtaList = [
          ...adtaList,
          ...treeToList(v[parents] as TreeNode[], parents),
        ];
      } else {
        adtaList.push(v);
      }
    } else {
      let isHave = false;
      parents.forEach((parent) => {
        if (v[parent]) {
          adtaList = [
            ...adtaList,
            ...treeToList(v[parent] as TreeNode[], parents),
          ];
          isHave = true;
        }
      });
      if (!isHave) {
        adtaList.push(v);
      }
    }
  });
  return adtaList;
};
