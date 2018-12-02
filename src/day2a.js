export default function(input) {
  let doubles = 0;
  let triples = 0;
  input.split("\n").forEach(element => {
    const idArr = element.split("").sort();
    let doubleCounted = false;
    let tripleCounted = false;

    for (let i = 0; i < idArr.length; ) {
      let j = i + 1;
      for (; j < idArr.length; j++) {
        if (idArr[i] !== idArr[j]) {
          break;
        }
      }
      if (j === i + 2 && !doubleCounted) {
        doubles++;
        doubleCounted = true;
      } else if (j === i + 3 && !tripleCounted) {
        triples++;
        tripleCounted = true;
      }
      i = j;
    }
  });

  return (doubles * triples).toString();
}
