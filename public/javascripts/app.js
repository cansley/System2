/**
 * Created by Charles on 1/17/2015.
 */
(function(){
    'use strict';
    var system2 = angular.module("system2",[]);
    system2.filter('percentage', ['$filter', function($filter){
        return function(input, decimals){
            return $filter('number')(input * 100, decimals) + '%';
        };
    }]);
    system2.directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsText(changeEvent.target.files[0]);
                });
            }
        }
    }]);

    system2.directive("amChart", function(){
        return {
            restrict: "E",
            transclude: true,
            template: "<div id='chart' ng-show='showChart' style='{{chartStyle}}'></div>",
            link: function(scope, element, attrs){
                // XY Chart
                var chart = new AmCharts.AmXYChart();
                chart.pathToImages = "/amcharts/images/";
                //chart.dataProvider = chartData;
                chart.startDuration = 0;
                scope.chart = chart;
                var chartGrade = attrs['grade'];

                scope.$watch('chartStyle', function(val){
                    if(scope.chartData == undefined || scope.chartData == null) return;
                    console.log('redrawing chart...');
                    chart.write("chart");
                });

                scope.$watch('chartData', function(val){
                    if(val== undefined || val == null) return;
                    console.log('updating Chart data');
                    chart.dataProvider = val[chartGrade];
                    // AXES
                    // X
                    var xAxis = new AmCharts.ValueAxis();
                    xAxis.title = "Assessment 2";
                    xAxis.position = "bottom";
                    xAxis.autoGridCount = true;
                    chart.addValueAxis(xAxis);

                    // Y
                    var yAxis = new AmCharts.ValueAxis();
                    yAxis.title = "Growth";
                    yAxis.position = "left";
                    yAxis.autoGridCount = true;
                    chart.addValueAxis(yAxis);


                    // GRAPH
                    var greenGraph = new AmCharts.AmGraph();
                    //graph.valueField = "value"; // valueField responsible for the size of a bullet
                    greenGraph.xField = "x";
                    greenGraph.xAxis = "x";
                    greenGraph.yField = "y";
                    greenGraph.lineAlpha = 0;
                    greenGraph.lineColor = '#B1D62B';
                    greenGraph.bulletField = 'bullet';
                    greenGraph.bulletSize = scope.bulletSize;
                    greenGraph.valueAxis="Not set";
                    greenGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value]]</b>";
                    chart.addGraph(greenGraph);

                    var redGraph = new AmCharts.AmGraph();
                    //graph.valueField = "value"; // valueField responsible for the size of a bullet
                    redGraph.xField = "x2";
                    redGraph.yField = "y2";
                    redGraph.lineAlpha = 0;
                    redGraph.lineColor = '#ff0000';
                    redGraph.bulletField = 'bullet2';
                    redGraph.bulletSize = scope.bulletSize;
                    redGraph.valueAxis="Not set";
                    redGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value2]]</b>";
                    chart.addGraph(redGraph);

                    var blueGraph = new AmCharts.AmGraph();
                    //graph.valueField = "value"; // valueField responsible for the size of a bullet
                    blueGraph.xField = "x3";
                    blueGraph.yField = "y3";
                    //blueGraph.lineAlpha = 0;
                    blueGraph.lineColor = '#0000ff';
                    blueGraph.bulletField = 'bullet3';
                    blueGraph.bulletSize = 1;
                    blueGraph.valueAxis="Not set";
                    blueGraph.showBalloon = false;
                    //blueGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value2]]</b>";
                    chart.addGraph(blueGraph);

                    chart.validateData();
                    chart.validateNow();
                    chart.write("chart");
                });
            }
        };
    });

    system2.factory('Student', function(){
        function Student(name, grade, score1, score2){
            this.name =name;
            this.grade=grade;
            this.score1 = score1;
            this.score2 = score2;
            this.growth = function(){
                if(typeof(this.score1) !== "number" || typeof(this.score2) !== "number"){
                    return '';
                } else{
                    return this.score2 - this.score1;
                }};
            this.percentGrowth = function(){
                if(!this.score1 || !this.score2){
                    return '';
                } else {
                    return this.growth() / this.score2;
                }
            };
        };

        return (Student);
    });

    system2.factory("StudentData", function($rootScope, ArrayMath){
        var studentData = {};
        studentData.Data = [];

        studentData.Grades = function(){
            var n = {},r=[];
            for(var i = 0; i < studentData.Data.length; i++)
            {
                if (!n[studentData.Data[i].grade])
                {
                    n[studentData.Data[i].grade] = true;
                    r.push(studentData.Data[i].grade);
                }
            }
            return r;
        }

        studentData.DataByGrade = function(grade){
            console.log(grade);
            if(typeof grade === 'undefined' || grade === null){
                console.log('returning full dataset.');
                return studentData.Data;
            }
            console.log('returning filtered dataset for grade ' + grade + '.');
            return studentData.Data.filter(function(student){
                if(student.grade === grade){
                    return true;
                }
            });
        }

        studentData.Growths = function(grade){
            var data = studentData.DataByGrade(grade);
            return data.map(function (student) {
                return student.growth();
            });
        }

        studentData.Scores = function (grade) {
            var data = studentData.DataByGrade(grade);
            return data.map(function (student) {
                return student.score2;
            });
        }

        studentData.UpdateStudentData = function (value){
            studentData.Data = value;
            $rootScope.$broadcast('studentDataUpdated');
        }

        studentData.AddStudent = function(student){
            studentData.Data.push(student);
            $rootScope.$broadcast('studentDataUpdated');
        }

        studentData.AverageGrowth = function(grade){
            return ArrayMath.Average(this.Growths(grade));
        }

        studentData.AverageScore = function(grade){
            return ArrayMath.Average(this.Scores(grade));
        }

        studentData.MinMaxGrowth = function(grade){
            var min = ArrayMath.Min(this.Growths(grade));
            var max = ArrayMath.Max(this.Growths(grade));
            return [min,max];
        }

        studentData.MinMaxScore = function(grade){
            var min = ArrayMath.Min(this.Scores(grade));
            var max = ArrayMath.Max(this.Scores(grade));
            return [min,max];
        }

        studentData.GrowthStandardDev = function(grade){
            return ArrayMath.StandardDeviation(this.Growths(grade));
        }

        studentData.ScoresStandardDev = function(grade){
            return ArrayMath.StandardDeviation(this.Scores(grade));
        }

        studentData.WithinStandardDevPlotpoints = function (grade) {
            var topScore = this.AverageScore(grade) + this.ScoresStandardDev(grade);
            var bottomScore = this.AverageScore(grade) - this.ScoresStandardDev(grade);
            var topGrowth = this.AverageGrowth(grade) + this.GrowthStandardDev(grade);
            var bottomGrowth = this.AverageGrowth(grade) - this.GrowthStandardDev(grade);
            var filteredList = studentData.DataByGrade(grade).filter(function(student){
                if((bottomScore <= student.score2 && student.score2 <= topScore) &&
                    (bottomGrowth <= student.growth() && student.growth() <= topGrowth)){
                    return true;
                }
            });
            return filteredList.map(function(student){
                return [student.score2, student.growth(), student.name]
            });
        }

        studentData.WithoutStandardDevPlotpoints = function (grade) {
            var topScore = this.AverageScore(grade) + this.ScoresStandardDev(grade);
            var bottomScore = this.AverageScore(grade) - this.ScoresStandardDev(grade);
            var topGrowth = this.AverageGrowth(grade) + this.GrowthStandardDev(grade);
            var bottomGrowth = this.AverageGrowth(grade) - this.GrowthStandardDev(grade);

            var filteredList = studentData.DataByGrade(grade).filter(function(student){
                if((student.score2 < bottomScore || student.score2 > topScore) ||
                    (student.growth() < bottomGrowth || student.growth() > topGrowth)){
                    return true;
                }
            });

            return filteredList.map(function(student){
                return [student.score2, student.growth(), student.name]
            });
        }

        studentData.Plotpoints = function(grade){
            return studentData.DataByGrade(grade).map(function(student){
                return [student.score2, student.growth(), student.name];
            });
        }

        studentData.TrendLinePoints = function(grade){
            var reg = regression('polynomial', this.Plotpoints(grade), 3);
            return reg.points;
        }

        return studentData;
    });

    system2.factory("ArrayMath", function(){
        var m = {};

        m.Min = function(values){
            return Math.min.apply(Math, values);
        };

        m.Max = function(values){
            return Math.max.apply(Math, values);
        };

        m.StandardDeviation = function(values){
            var avg = this.Average(values);

            var squareDiffs = values.map(function(value){
                var diff = value - avg;
                var sqrDiff = diff * diff;
                return sqrDiff;
            });

            var avgSquareDiff = this.Average(squareDiffs);

            var stdDev = Math.sqrt(avgSquareDiff);
            return stdDev;
        };

        m.Average = function(data){
            var sum = data.reduce(function(sum, value){
                return sum + value;
            }, 0);

            var avg = sum / data.length;
            return avg;
        };

        return m;
    });

    system2.controller("sys2Ctrl", function($scope, $http, Student, StudentData){
        var app = this;
        console.log('init controller...');
        $scope.students = [];
        $scope.grades = [];
        $scope.bulletSize = 10;
        $scope.chartStyle = "width: 800px; height: 600px;";
        $scope.showForm = false;
        $scope.showChart = false;
        $scope.showFile = true;

        $scope.$on('studentDataUpdated', function(){
            $scope.students = StudentData.Data;
            $scope.grades = StudentData.Grades();
        });

        // start by loading up some empty students
        for(var x = 0;x<5;x++){
            StudentData.AddStudent(new Student('Student '+ x));
        }

        console.log($scope.students);

        $scope.loadStudents = function(element){
            // read the file from the browser and populate students.
            var file = element.files[0];
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
                var contents =loadEvent.target.result.split('\n');
                StudentData.UpdateStudentData([]);
                for(var i in contents){
                    var content = contents[i].replace(/'/g, "").replace(/"/g, '');
                    var arr = content.split(',');
                    if(arr.length > 1) {
                        var student = new Student(arr.slice(0, -3).join(), Number(arr[arr.length-3]), Number(arr[arr.length-2]), Number(arr[arr.length-1]));
                        StudentData.AddStudent(student);
                    }
                }

                for(var x = 0;x<StudentData.Grades().length;x++){
                    var targetGrade = StudentData.Grades()[x];
                    var topScore = StudentData.AverageScore(targetGrade) + StudentData.ScoresStandardDev(targetGrade);
                    var bottomScore = StudentData.AverageScore(targetGrade) - StudentData.ScoresStandardDev(targetGrade);
                    var topGrowth = StudentData.AverageGrowth(targetGrade) + StudentData.GrowthStandardDev(targetGrade);
                    var bottomGrowth = StudentData.AverageGrowth(targetGrade) - StudentData.GrowthStandardDev(targetGrade);
                    console.log('Score range: ' + bottomScore + ' to ' + topScore);
                    console.log('Growth range: ' + bottomGrowth + ' to ' + topGrowth);
                    console.log(StudentData.Plotpoints(targetGrade));
                    console.log(StudentData.WithinStandardDevPlotpoints(targetGrade));
                    console.log(StudentData.WithoutStandardDevPlotpoints(targetGrade));
                    console.log(StudentData.Grades(targetGrade));
                }

                $scope.showForm=true;
                $scope.showFile = false;
                $scope.$apply();
            };
            reader.readAsText(file);
        };

        $scope.addStudent = function(){
            StudentData.AddStudent(new Student());
        };

        $scope.processStudents = function() {
            $scope.chartData = [];
            for(var x=0;x<StudentData.Grades().length;x++) {
                var targetGrade = StudentData.Grades()[x];
                var greenPoints = StudentData.WithinStandardDevPlotpoints(targetGrade);
                var redPoints = StudentData.WithoutStandardDevPlotpoints(targetGrade);
                var bluePoints = StudentData.TrendLinePoints(targetGrade).sort(function (a, b) {
                    return a[0] - b[0]
                });
                var newChartData = [];
                var defaultx = StudentData.AverageScore(targetGrade);
                var defaulty = StudentData.AverageGrowth(targetGrade);

                var x = greenPoints.length;
                if (redPoints.length > x) {
                    x = redPoints.length;
                }

                if (bluePoints.length > x) {
                    x = bluePoints.length;
                }

                for (var i = 0; i < x; i++) {
                    var dataObj = {};
                    if (i < greenPoints.length) {
                        dataObj.x = greenPoints[i][0];
                        dataObj.y = greenPoints[i][1];
                        dataObj.value = greenPoints[i][2];
                        dataObj.bullet = "round";
                    } else {
                        dataObj.x = defaultx;
                        dataObj.y = defaulty;
                        dataObj.value = 'Average';
                        dataObj.bullet = null;
                    }

                    if (i < redPoints.length) {
                        dataObj.x2 = redPoints[i][0];
                        dataObj.y2 = redPoints[i][1];
                        dataObj.value2 = redPoints[i][2];
                        dataObj.bullet2 = "round";
                    } else {
                        dataObj.x2 = defaultx;
                        dataObj.y2 = defaulty;
                        dataObj.value = 'Average';
                    }

                    if (i < bluePoints.length) {
                        dataObj.x3 = bluePoints[i][0];
                        dataObj.y3 = bluePoints[i][1];
                        dataObj.bullet3 = "round";
                    }

                    newChartData.push(dataObj);
                }

                $scope.chartData[targetGrade] = newChartData;
            }
        }

        $scope.showLargeChart = function(){
            $scope.bulletSize = 10;
            $scope.chartStyle =  "width: 800px; height: 600px;";
        }

        $scope.showMedChart = function(){
            $scope.bulletSize = 5;
            $scope.chartStyle =  "width: 600px; height: 400px;";
        }

        $scope.showSmallChart = function(){
            $scope.bulletSize = 1;
            $scope.chartStyle =  "width: 300px; height: 200px;";
        }
    });
})();