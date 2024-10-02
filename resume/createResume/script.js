document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.querySelector('.sidebar');
    var mainContent = document.querySelector('.main-content');
    var loadData = function () {
        var data = localStorage.getItem('cv-form-data');
        if (data) {
            var parsedData = JSON.parse(data);
            // Sidebar
            sidebar.querySelector('.name').textContent = parsedData.fullName;
            sidebar.querySelector('.contact-info').innerHTML = "\n                <p>Email: ".concat(parsedData.email, "</p>\n                <p>Phone: ").concat(parsedData.phone, "</p>\n                <p>Location: ").concat(parsedData.address || 'N/A', "</p>\n            ");
            // Main Content - Experience
            var experienceSection_1 = mainContent.querySelector('section:nth-of-type(1) .timeline');
            experienceSection_1.innerHTML = '';
            parsedData.experience.forEach(function (exp) {
                var experienceItem = document.createElement('div');
                experienceItem.classList.add('timeline-item', 'fade-in');
                experienceItem.innerHTML = "\n                    <h3>".concat(exp.jobTitle, "</h3>\n                    <span>").concat(exp.company, " | ").concat(exp.duration, "</span>\n                    <p>").concat(exp.jobDescription, "</p>\n                ");
                experienceSection_1.appendChild(experienceItem);
            });
            // Main Content - Education
            var educationSection_1 = mainContent.querySelector('section:nth-of-type(2) .timeline');
            educationSection_1.innerHTML = '';
            parsedData.education.forEach(function (edu) {
                var educationItem = document.createElement('div');
                educationItem.classList.add('timeline-item', 'fade-in');
                educationItem.innerHTML = "\n                    <h3>".concat(edu.degree, "</h3>\n                    <span>").concat(edu.institution, " | ").concat(edu.yearOfGraduation, "</span>\n                ");
                educationSection_1.appendChild(educationItem);
            });
            // Main Content - Skills
            var skillsSection_1 = mainContent.querySelector('section:nth-of-type(4) .skills');
            skillsSection_1.innerHTML = '';
            parsedData.skills.split(',').forEach(function (skill) {
                var skillItem = document.createElement('li');
                skillItem.textContent = skill.trim();
                skillItem.classList.add('fade-in');
                skillsSection_1.appendChild(skillItem);
            });
        }
    };
    loadData();
});
