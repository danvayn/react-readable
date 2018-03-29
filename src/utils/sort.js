import sortBy from 'sort-by'

export const sortArray = ({contents, order}) => {
  const newArray = contents;
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
  const newposts = payload.sort(sortBy('-voteScore','timestamp'))
  console.log(newposts);
  return payload
}
const sortByLowest = (payload) => {
  const newposts = payload.sort(sortBy('voteScore','timestamp'))
  console.log(newposts);
  return newposts;
}
const sortByNewest = (payload) => {
  const newposts = payload.sort(sortBy('-timestamp','voteScore'))
  console.log(newposts);
  return newposts;
}
const sortByOldest = (payload) => {
  const newposts = payload.sort(sortBy('timestamp','voteScore'))
  console.log(newposts);
  return newposts
}
