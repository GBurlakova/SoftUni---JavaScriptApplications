(function() { 
    var $studentsInput = $('#students');
    var $ageFilter = $('#age-filter');
    var $namesFilter = $('#names-filter');
    var $countryFilter = $('#country-filter');
    var $positionFilter = $('#position-filter');
    var $complexFilter = $('#complex-filter');
    var $resultWrapper = $('#result');
    var students;

    $ageFilter.on('click', function () {
        students = JSON.parse($studentsInput.val());
        filterByAge(students, 18, 24)
    });
    $namesFilter.on('click', function () {
        students = JSON.parse($studentsInput.val());
        filterByNames(students);
    });
    $countryFilter.on('click', function () {
        students = JSON.parse($studentsInput.val());
        filterNamesByCountry(students, 'Bulgaria');
    });
    $positionFilter.on('click', function () {
        students = JSON.parse($studentsInput.val());
        filterByCount(students, 5);
    });
    $complexFilter.on('click', function () {
        students = JSON.parse($studentsInput.val());
        filterByMultipleConditions(students, 'Bulgaria', 'Male', 3);
    });

    function filterByAge(students, startAgeRange, endAgeRange) {
        var studentsFiltered = _.filter(students, function (student) {
            var ageHigherThanStart = parseInt(student.age) >= startAgeRange;
            var ageLessThanEnd = parseInt(student.age) <= endAgeRange;
            return  ageHigherThanStart && ageLessThanEnd;
        });
        showResult(studentsFiltered);
    }

    function filterByNames(students) {
        var studentsFiltered = _.filter(students, function (student) {
            var firstNameBeforeLastName = student.firstName.localeCompare(student.lastName);
            firstNameBeforeLastName = firstNameBeforeLastName === -1;
            return  firstNameBeforeLastName;
        });
        showResult(studentsFiltered);
    }

    function filterNamesByCountry(students, country) {
        var studentsFiltered = _.filter(students, function (student) {
            var countryMatches = student.country === country;
            return  countryMatches;
        });
        var studentNames = _.map(studentsFiltered, function (student) {
            return student.firstName + ' ' + student.lastName;
        });
        showResult(studentNames);
    }

    function filterByCount(students, count) {
        var studentsFiltered = _.last(students, count);
        showResult(studentsFiltered);
    }

    function filterByMultipleConditions(students, country, gender, count) {
        var studentsFiltered = _.filter(students, function (student) {
            var countryMathches = student.country !== country;
            var genderMatches = student.gender === gender;
            return  countryMathches && genderMatches;
        });
        var firstStudents = _.first(studentsFiltered, count);
        showResult(firstStudents);
    }

    function showResult(array) {
        $resultWrapper.text('');
        $resultWrapper.text(JSON.stringify(array));
    }
})();