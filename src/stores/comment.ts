import { defineStore } from 'pinia'
import type { commmentInfo } from '@/comment'
export const commentStudent = defineStore('comment', {
    state: () => ({
        comment: [] as commmentInfo[]
    }),
    actions: {
        pushComment(comment: { id: number; comment: string }){
            this.comment.push(comment)
        }
    }
})