import {Body, Controller, Post} from '@nestjs/common';
import {PostService} from "./post.service";

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {
    }

    @Post()
    createPost(@Body('title') title,@Body('description') descriptoin){
        return this.postService.createPost(title,descriptoin);
    }
}
