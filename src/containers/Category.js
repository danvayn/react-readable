
const CategoryPageContainer = ({category, posts}) => {
 return (
   <div className="page category">

     <Header currentCategory={category}/>
     <PostList posts={posts}/>

   </div>
 );};

 export default CategoryPageContainer
