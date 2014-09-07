def getCoords(incoming_str):
  rows = incoming_str.split("\n");
  lis = []
  for row in rows:
    lis.append(row)

  points = []

  for i in range(0, len(lis)):
    for j in range(0, len(lis[i])):
      if lis[i][j] != " ":
        points.append((i, j))

  return points