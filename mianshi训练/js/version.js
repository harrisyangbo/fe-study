/**
 * 比较两个版本号
 * 
*/

function versions(v1, v2) {
  let arr1 = v1.split('.')
  let arr2 = v2.split('.')

  let maxLength = Math.max(arr1.length, arr2.length);
  let result = 0;
  let sa, sb;
  for(let i = 0; i<maxLength; i++) {
    sa = ~~arr1[i]
    sb = ~~arr2[i]
    if (sa > sb) {
      result = 1
    } else if(sa < sb) {
      result = -1
    } else {
      result = 0
    }
    if (result !== 0) {
      return result
    }
  }
  return result;
}

console.log(versions('8.8.2', '1.0.2'))