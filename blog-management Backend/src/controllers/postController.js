const postModel = require('../models/postMode'); 


const  createOrGetBlog = async (request, response) => {
    if (request.method === 'POST') {
        try {
     
            const requestBody = request.body;
         
            //checking for empty request body
            if (Object.keys(requestBody).length === 0) {
                return response.status(400).send({status: false, message: 'Empty body'});
            }
            //destructuring request body
            const {title, content, authorId, category, subcategory, tags, isDeleted, publishedAt} = requestBody;

            const newPost = postModel.create(requestBody);

            if(newPost){
                return response.status(200).send({status: true, message:"Post created successfully!"});
            } else {
                return response.status(400).send({status: false, message:"Post not created"});
            }   
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    } else if (request.method === 'GET') {
            try {
                let { authorId, tags, category, subcategory } = request.query;
            
                let blogs = await blogModel.find({$or:
                  [{isDeleted: false}, {$or: [{ authorId: authorId },
                  { tags: tags },
                  { category: category },
                  { subcategory: subcategory }]}
                  ]
                });
                if (!blogs) {
                  return response.status(404).send({staus:true, message:"Nothing found!" });
                }
                return response.status(200).send({staus:true, data: blogs });
            } catch (error) {
                return response.status(500).send({ error: error.message });
            }
    }
}


const UpdateOrDeleteBlog = async (request, response) => {
    if(request.method === 'UPDATE') {
        try {

            const { title, content, tags, subcategory, category} = request.body;
            const id = request.params.id;

            const blog = await blogModel.findById(id);
             if(!blog) {
                return response.status(404).send({status:404, msg:"Blog not found"});
             }

             let updatedTags = blog.tags
             if (tags) {
               updatedTags.push(tags)
             }

             let updatedSubCategory = blog.subcategory
             if (subcategory) {
               updatedSubCategory.push(subcategory)
             }
         
             let updatedBlog = await blogModel.findOneAndUpdate(
               { _id: id},
               {
                title: title,
                content: content,
                 category: category,
                 tags: updatedTags,  
                 subcategory: updatedSubCategory, 
               },
               { returnDocument: 'after' },
             )

             console.log(updatedBlog)

             if (!updatedBlog) {
               return res.status(404).send({ status:false, message:"Blog not found!"})
             }
             return res.status(200).send({status:true ,Updates: updatedBlog })

         } catch (error) {
            return response.status(500).send({ error: error.message });
        }

    } else if(request.method === 'DELETE') {
        try {
            
        } catch (error) {
            return response.status(500).send({ error: error.message });
        }
    }
}