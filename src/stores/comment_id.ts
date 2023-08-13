import { defineStore } from 'pinia'
export const commentStudentId = defineStore('comment_id', {
    state: () => ({
        comment_id: []
    }),
    actions: {
        setComment(comment){
            this.comment_id=comment
        }
    }
})