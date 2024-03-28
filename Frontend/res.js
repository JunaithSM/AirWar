let res = prompt("Graphics\nEnter Number > 0.\n(Recommend Number: 1 or 0.5)\n0:Very Low\n1:Low\n2:Medium\n3:High\n4:Ultra\n5:Ultra High")
while (res <=0||!res){
  res = prompt("Graphics\nEnter Number > 0\nNot less or equal to zero.\n(Recommend Number: 1)")
}
const Res = res
export {Res};
