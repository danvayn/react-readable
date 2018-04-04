import sortBy from 'sort-by'

export const sortArray = ({contents, order}) => {
  const newArray = contents;
  console.log("XXX");
  console.log(contents, order);
  if(contents && contents.length > 0) {
    switch(order) {
      case 'highest':
        return sortByHighest(newArray);
      case 'lowest':
        return sortByLowest(newArray);
      case 'newest':
        return sortByNewest(newArray);
      case 'oldest':
        return sortByOldest(newArray);
      default:
        return contents;
    }
  }
}

const sortByHighest = (payload) => {
  return payload.sort(sortBy('-voteScore','timestamp'))
}
const sortByLowest = (payload) => {
  return payload.sort(sortBy('voteScore','timestamp'))
}
const sortByNewest = (payload) => {
  return payload.sort(sortBy('-timestamp','voteScore'))
}
const sortByOldest = (payload) => {
  return payload.sort(sortBy('timestamp','voteScore'))
}
