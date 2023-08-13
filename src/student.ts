export interface studentInfo {
    id: number;
    name: string;
    surname: string;
    image: string;
    course_list: []
    teacher_id: number;
    comment: []
}
export interface Course {
    course_id: number, 
    course_name: string
}