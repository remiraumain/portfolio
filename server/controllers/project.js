const Project = require('../models/project');
const File = require('../models/file');
const fs = require('fs');

exports.createProject = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const files = [];
    req.files.map((file, index) => {
        const newFile = new File({
            filename: file.filename,
            type: file.mimetype.split('/')[0],
            path: url + '/' + file.path,
            position: index,
        });
        files.push(newFile);
    });

    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        projectUrl: req.body.projectUrl,
        date: req.body.date,
        files: files
    });

    //console.log(project);
    project.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({ error: error});
        }
    );
};

exports.getOneProject = (req, res, next) => {
    Project.findOne({
        _id: req.params.id
    }).then(
        (project) => {
            res.status(200).json(project);
        }
    ).catch(
        (error) => {
            res.status(404).json({ error: error});
        }
    );
};

exports.modifyOneProject = (req, res, next) => {
    let project = new Project({ _id: req.params._id });
    if (req.files) {
        const url = req.protocol + '://' + req.get('host');
        const files = [];
        req.files.map((file, index) => {
            const newFile = new File({
                filename: file.filename,
                type: file.mimetype.split('/')[0],
                path: url + '/' + file.path,
                position: index,
            });
            files.push(newFile);
        });

        project = {
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            projectUrl: req.body.projectUrl,
            date: req.body.date,
            files: files
        };
    } else {
        project = {
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            projectUrl: req.body.projectUrl,
            date: req.body.date
        };
    }
    Project.updateOne({ _id: req.params.id }, project).then(
        () => {
            res.status(200).json({
                message: 'Project updated successfully'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({ error: error});
        }
    );
};

exports.deleteOneProject = (req, res, next) => {

    Project.findOne({ _id: req.params.id }).then(
        (project) => {
            project.files.forEach((file) => {
                fs.unlink('uploads/' + file.filename, (err) => {
                    if (err) throw err;
                    console.log('path/file.txt was deleted');
                });
            });


            Project.deleteOne({ _id: req.params.id }).then(
                () => {
                    res.status(200).json({
                        message: 'Project deleted successfully'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({error: error});
                }
            );

        }
    ).catch(
        (error) => {
            res.status(400).json({ error: error});
        }
    );
};

exports.getAllProjects = (req, res, next) => {
    Project.find().then(
        (projects) => {
            res.status(200).json(projects);
        }
    ).catch(
        (error) => {
            res.status(400).json({ error: error});
        }
    );
};