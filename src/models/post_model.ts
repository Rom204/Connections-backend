export default class PostModel { 
    public post_id : string;
    public title: string;
    public body: string;

    constructor(post:PostModel) {
        this.post_id = post.post_id;
        this.title = post.title;
        this.body = post.body;
    }

}