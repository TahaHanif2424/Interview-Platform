import api from "../../../../utils/api";

type JobData = {
    title: string;
    description: string;
    requirements: string;
    location: string;
    specification: string;
}

export const addJobs=(data: JobData)=>{
    const output=api.post('/jobs/create',data);
    console.log('API Response:', output);
    return output;
}