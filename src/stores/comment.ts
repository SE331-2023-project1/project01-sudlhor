import { defineStore } from 'pinia'
import type { commmentInfo } from '@/comment'
export const commentStudent = defineStore('comment', {
    state: () => ({
        comment: [] as commmentInfo[]
    }),
    actions: {
        pushComment(comment: commmentInfo){
            this.comment.push(comment)
        }
    }
})