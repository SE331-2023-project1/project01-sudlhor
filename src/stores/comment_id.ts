import type { commmentInfo } from '@/comment'
import { defineStore } from 'pinia'
export const commentStudentId = defineStore('comment_id', {
    state: () => ({
        comment_id: [] as commmentInfo []
    }),
    actions: {
        setComment(comment: commmentInfo[]){
            this.comment_id=comment
        }
    }
})