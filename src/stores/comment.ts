import { defineStore } from 'pinia'
import type { commmentInfo } from '@/comment'
export const commentStudent = defineStore('comment', {
    state: () => ({
        comment: []
    }),
    actions: {
        pushComment(comment){
            this.comment.push(comment)
        }
    }
})