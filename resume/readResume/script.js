document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d;
    var educationContainer = document.getElementById('education-container');
    var experienceContainer = document.getElementById('experience-container');
    var educationCount = 1;
    var experienceCount = 1;
    var addEducationEntry = function () {
        educationCount++;
        var newEducationEntry = document.createElement('div');
        newEducationEntry.classList.add('education-entry');
        newEducationEntry.innerHTML = "\n            <label for=\"degree-".concat(educationCount, "\">Degree:</label>\n            <input type=\"text\" id=\"degree-").concat(educationCount, "\" name=\"degree-").concat(educationCount, "\" required>\n            \n            <label for=\"institution-").concat(educationCount, "\">Institution:</label>\n            <input type=\"text\" id=\"institution-").concat(educationCount, "\" name=\"institution-").concat(educationCount, "\" required>\n            \n            <label for=\"year-of-graduation-").concat(educationCount, "\">Year of Graduation:</label>\n            <input type=\"number\" id=\"year-of-graduation-").concat(educationCount, "\" name=\"year-of-graduation-").concat(educationCount, "\" required>\n        ");
        educationContainer.appendChild(newEducationEntry);
    };
    var addExperienceEntry = function () {
        experienceCount++;
        var newExperienceEntry = document.createElement('div');
        newExperienceEntry.classList.add('experience-entry');
        newExperienceEntry.innerHTML = "\n            <label for=\"job-title-".concat(experienceCount, "\">Job Title:</label>\n            <input type=\"text\" id=\"job-title-").concat(experienceCount, "\" name=\"job-title-").concat(experienceCount, "\" required>\n\n            <label for=\"company-").concat(experienceCount, "\">Company:</label>\n            <input type=\"text\" id=\"company-").concat(experienceCount, "\" name=\"company-").concat(experienceCount, "\" required>\n\n            <label for=\"job-duration-").concat(experienceCount, "\">Duration (e.g., Jan 2020 - Dec 2021):</label>\n            <input type=\"text\" id=\"job-duration-").concat(experienceCount, "\" name=\"job-duration-").concat(experienceCount, "\" required>\n\n            <label for=\"job-description-").concat(experienceCount, "\">Job Description:</label>\n            <textarea id=\"job-description-").concat(experienceCount, "\" name=\"job-description-").concat(experienceCount, "\" rows=\"4\" required></textarea>\n        ");
        experienceContainer.appendChild(newExperienceEntry);
    };
    var saveFormData = function (data) {
        localStorage.setItem('cv-form-data', JSON.stringify(data));
    };
    var loadFormData = function () {
        var _a;
        var data = localStorage.getItem('cv-form-data');
        if (data) {
            var parsedData = JSON.parse(data);
            document.getElementById('full-name').value = parsedData.fullName;
            document.getElementById('email').value = parsedData.email;
            document.getElementById('phone').value = parsedData.phone;
            document.getElementById('address').value = parsedData.address || '';
            document.getElementById('skills').value = parsedData.skills;
            // Populate education entries
            parsedData.education.forEach(function (entry, index) {
                if (index >= educationCount)
                    addEducationEntry();
                document.querySelector("#degree-".concat(index + 1)).value = entry.degree;
                document.querySelector("#institution-".concat(index + 1)).value = entry.institution;
                document.querySelector("#year-of-graduation-".concat(index + 1)).value = entry.yearOfGraduation.toString();
            });
            // Populate experience entries
            parsedData.experience.forEach(function (entry, index) {
                if (index >= experienceCount)
                    addExperienceEntry();
                document.querySelector("#job-title-".concat(index + 1)).value = entry.jobTitle;
                document.querySelector("#company-".concat(index + 1)).value = entry.company;
                document.querySelector("#job-duration-".concat(index + 1)).value = entry.duration;
                document.querySelector("#job-description-".concat(index + 1)).value = entry.jobDescription;
            });
            // Display profile picture
            var profilePicInput = document.getElementById('profile-pic');
            if (parsedData.profilePic) {
                var imgElement = document.createElement('img');
                imgElement.src = parsedData.profilePic;
                imgElement.id = 'profile-pic-preview';
                (_a = document.querySelector('form')) === null || _a === void 0 ? void 0 : _a.insertBefore(imgElement, profilePicInput.nextSibling);
            }
        }
    };
    (_a = document.getElementById('add-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addEducationEntry);
    (_b = document.getElementById('add-experience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addExperienceEntry);
    (_c = document.getElementById('cv-form')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', function (event) {
        var _a;
        event.preventDefault();
        var profilePicInput = document.getElementById('profile-pic');
        var formData = {
            fullName: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value || undefined,
            education: Array.from(document.querySelectorAll('.education-entry')).map(function (entry) {
                var _a, _b, _c, _d, _e, _f;
                return ({
                    degree: (_b = (_a = entry.querySelector('input[name^="degree"]')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '',
                    institution: (_d = (_c = entry.querySelector('input[name^="institution"]')) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '',
                    yearOfGraduation: parseInt((_f = (_e = entry.querySelector('input[name^="year-of-graduation"]')) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '0')
                });
            }),
            experience: Array.from(document.querySelectorAll('.experience-entry')).map(function (entry) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return ({
                    jobTitle: (_b = (_a = entry.querySelector('input[name^="job-title"]')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '',
                    company: (_d = (_c = entry.querySelector('input[name^="company"]')) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '',
                    duration: (_f = (_e = entry.querySelector('input[name^="job-duration"]')) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '',
                    jobDescription: (_h = (_g = entry.querySelector('textarea[name^="job-description"]')) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : ''
                });
            }),
            skills: document.getElementById('skills').value,
            profilePic: ((_a = profilePicInput === null || profilePicInput === void 0 ? void 0 : profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0]) ? URL.createObjectURL(profilePicInput.files[0]) : undefined
        };
        saveFormData(formData);
        alert('CV data saved to local storage!');
    });
    (_d = document.getElementById('profile-pic')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', function (event) {
        var _a, _b;
        var fileInput = event.target;
        if ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]) {
            var imgElement = document.getElementById('profile-pic-preview') || document.createElement('img');
            imgElement.id = 'profile-pic-preview';
            imgElement.src = URL.createObjectURL(fileInput.files[0]);
            (_b = document.querySelector('form')) === null || _b === void 0 ? void 0 : _b.insertBefore(imgElement, fileInput.nextSibling);
        }
    });
    loadFormData();
});
