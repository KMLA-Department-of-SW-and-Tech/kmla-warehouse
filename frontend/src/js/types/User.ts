export type GetUser = {
    _id: string;
    firebaseUid: string;
    userType: "Unauthorized" | "User" | "Admin";
    userName?: string;
    userGrade?: string;
    userClassNumber?: string;
    userStudentNumber?: string;
    teamName?: string;
};
  
export type PatchUser = Partial<GetUser>;