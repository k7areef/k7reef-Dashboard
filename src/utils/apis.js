import { supabase } from "./supabaseClient"

// App Config
export const GET_APP_CONFIG = async () => {
    const response = await supabase
        .from('app_config')
        .select("*")
        .single()
    if (response.error) {
        throw new Error(response.error);
    }
    return response;
};

// Projects
export const GET_PROJECTS = async () => {
    const response = await supabase
        .from("projects")
        .select(`*, techs: project-skills (skills (name,image_url))`)
        .order('updated_at', { ascending: false });
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const GET_PROJECT = async (projectId) => {
    const response = await supabase
        .from("projects")
        .select(`*, techs: project-skills (skills (name,image_url))`)
        .eq("id", projectId)
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const CREATE_PROJECT = async (values) => {
    const response = await supabase
        .from("projects")
        .insert(values)
        .select(`*, techs: project-skills (skills (name,image_url))`)
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const UPDATE_PROJECT = async (projectId, values) => {
    const response = await supabase
        .from("projects")
        .update(values)
        .eq("id", projectId)
        .select(`*, techs: project-skills (skills (name,image_url))`)
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const DELETE_PROJECT = async (projectId) => {
    const response = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId)
        .select(`*, techs: project-skills (skills (name,image_url))`)
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};

// Skills
export const GET_SKILLS = async () => {
    const response = await supabase
        .from("skills")
        .select("*")
        .order('updated_at', { ascending: false });
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const GET_SKILL = async (skillId) => {
    const response = await supabase
        .from("skills")
        .select("*")
        .eq("id", skillId)
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const CREATE_SKILL = async (values) => {
    const response = await supabase
        .from("skills")
        .insert(values)
        .select("*")
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const UPDATE_SKILL = async (skillId, values) => {
    const response = await supabase
        .from("skills")
        .update(values)
        .eq("id", skillId)
        .select("*")
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const DELETE_SKILL = async (skillId) => {
    const response = await supabase
        .from("skills")
        .delete()
        .eq("id", skillId)
        .select("*")
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};

// Services
export const GET_SERVICES = async () => {
    const response = await supabase
        .from("services")
        .select("*")
        .order('updated_at', { ascending: false });
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const GET_SERVICE = async (serviceId) => {
    const response = await supabase
        .from("services")
        .select("*")
        .eq("id", serviceId)
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const CREATE_SERVICE = async (values) => {
    const response = await supabase
        .from("services")
        .insert(values)
        .select("*")
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const UPDATE_SERVICE = async (serviceId, values) => {
    const response = await supabase
        .from("services")
        .update(values)
        .eq("id", serviceId)
        .select("*")
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};
export const DELETE_SERVICE = async (serviceId) => {
    const response = await supabase
        .from("services")
        .delete()
        .eq("id", serviceId)
        .select("*")
        .single();
    if (response.error) throw new Error(response.error.message)
    return response;
};