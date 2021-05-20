import { Injectable } from '@nestjs/common';
import {Post} from "./post.entity";
import {PostRepository} from "./post.repository";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository)
        private postRepository : PostRepository) {
    }
    async createPost(title,description){
        const post = new Post();
        post.title = title;
        post.description = description;
        post.created_at = new Date();
        post.updated_at = new Date();
        await post.save();
        return post;

    }
}
