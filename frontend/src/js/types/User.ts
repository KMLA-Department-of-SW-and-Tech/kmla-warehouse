export type GetUser = {
    _id: string;
    firebaseUid: string;
    userType: "Unauthorized" | "User" | "Admin";
    userName?: string;
    userGrade?: number;
    userClassNumber?: number;
    userStudentNumber?: number;
    teamName?: string;
};
  
export type PatchUser = Partial<GetUser>;