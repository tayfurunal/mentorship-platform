package com.tayfurunal.kanbantool.service;

import com.tayfurunal.kanbantool.domain.Project;
import com.tayfurunal.kanbantool.exception.ProjectIdentifierException;
import com.tayfurunal.kanbantool.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdentifierException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "'already exist");
        }
    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectIdentifierException("Project ID '" + projectId.toUpperCase() + "'does not exist");
        }

        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
            throw new ProjectIdentifierException("Cannot Project with ID '"+projectId+"'. This project does not exist");
        }
        projectRepository.delete(project);
    }


}
