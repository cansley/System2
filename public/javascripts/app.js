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

    system2.directive("xyChart", function(){
        return {
            restrict: "E",
            transclude: true,
            template: "<div id='xychart{{grade}}' ng-show='showChart' ng-style='{{getXyChartStyle(grade)}}'></div>",
            link: function(scope, element, attrs){
                var chartGrade = attrs['grade'];
                var chartName = 'xychart' + chartGrade;

                // XY Chart
                if(typeof chart === 'undefined' || chart === null){
                    var chart = [];
                }


                scope.$watch('xyChartStyles', function (val) {
                    console.log("xyChartStyles Changed...");
                    if (scope.xychartData == undefined || scope.xychartData == null) return;
                    if (chart[chartGrade] === undefined)  return;
                    console.log('redrawing ' + chartName + '...');
                    chart[chartGrade].write(chartName);
                    setTimeout(function(){ chart[chartGrade].validateNow(); }, 10);
                }, true);

                scope.$watch('xychartData', function(val){
                    if(val== undefined || val == null) return;
                    console.log('updating Chart data for ' + chartName);
                    chart[chartGrade] = new AmCharts.AmXYChart();
                    chart[chartGrade].pathToImages = "/amcharts/images/";
                    chart[chartGrade].startDuration = 0;
                    chart[chartGrade].autoMargins = false;
                    chart[chartGrade].marginLeft = 60;
                    chart[chartGrade].marginBottom = 60;
                    chart[chartGrade].dataProvider = val[chartGrade];
                    // AXES
                    // X
                    var xAxis = new AmCharts.ValueAxis();
                    xAxis.title = "Assessment 2";
                    xAxis.position = "bottom";
                    xAxis.autoGridCount = true;
                    chart[chartGrade].addValueAxis(xAxis);

                    // Y
                    var yAxis = new AmCharts.ValueAxis();
                    yAxis.title = "Growth";
                    yAxis.position = "left";
                    yAxis.autoGridCount = true;
                    chart[chartGrade].addValueAxis(yAxis);


                    // GRAPH
                    var greenGraph = new AmCharts.AmGraph();
                    greenGraph.xField = "x";
                    greenGraph.xAxis = "x";
                    greenGraph.yField = "y";
                    greenGraph.lineAlpha = 0;
                    greenGraph.lineColor = '#B1D62B';
                    greenGraph.bulletField = 'bullet';
                    greenGraph.bulletSize = scope.bulletSize;
                    greenGraph.valueAxis="Not set";
                    greenGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value]]</b>";
                    chart[chartGrade].addGraph(greenGraph);

                    var redGraph = new AmCharts.AmGraph();
                    redGraph.xField = "x2";
                    redGraph.yField = "y2";
                    redGraph.lineAlpha = 0;
                    redGraph.lineColor = '#ff0000';
                    redGraph.bulletField = 'bullet2';
                    redGraph.bulletSize = scope.bulletSize;
                    redGraph.valueAxis="Not set";
                    redGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value2]]</b>";
                    chart[chartGrade].addGraph(redGraph);

                    var blueGraph = new AmCharts.AmGraph();
                    blueGraph.xField = "x3";
                    blueGraph.yField = "y3";
                    blueGraph.lineColor = '#0000ff';
                    blueGraph.bulletField = 'bullet3';
                    blueGraph.bulletSize = 1;
                    blueGraph.valueAxis="Not set";
                    blueGraph.showBalloon = false;
                    chart[chartGrade].addGraph(blueGraph);

                    chart[chartGrade].write(chartName);
                    chart[chartGrade].validateData();

                    // check me out, too fast for AmCharts!
                    setTimeout(function(){ chart[chartGrade].validateNow(); }, 10);
                });
            }
        };
    });

    system2.directive("printXyChart", function(){
        return {
            restrict: "E",
            transclude: true,
            template: "<div id='printxychart{{grade}}' ng-show='showChart' ng-style='{{printChart}}'></div>",
            link: function(scope, element, attrs){
                var chartGrade = attrs['grade'];
                var chartName = 'printxychart' + chartGrade;

                // XY Chart
                if(typeof chart === 'undefined' || chart === null){
                    var chart = [];
                }

                scope.$watch('xychartData', function(val){
                    if(val== undefined || val == null) return;
                    console.log('updating Chart data for ' + chartName);
                    chart[chartGrade] = new AmCharts.AmXYChart();
                    chart[chartGrade].pathToImages = "/amcharts/images/";
                    chart[chartGrade].startDuration = 0;
                    chart[chartGrade].autoMargins = false;
                    chart[chartGrade].marginLeft = 60;
                    chart[chartGrade].marginBottom = 60;
                    chart[chartGrade].dataProvider = val[chartGrade];
                    // AXES
                    // X
                    var xAxis = new AmCharts.ValueAxis();
                    xAxis.title = "Assessment 2";
                    xAxis.position = "bottom";
                    xAxis.autoGridCount = true;
                    chart[chartGrade].addValueAxis(xAxis);

                    // Y
                    var yAxis = new AmCharts.ValueAxis();
                    yAxis.title = "Growth";
                    yAxis.position = "left";
                    yAxis.autoGridCount = true;
                    chart[chartGrade].addValueAxis(yAxis);


                    // GRAPH
                    var greenGraph = new AmCharts.AmGraph();
                    greenGraph.xField = "x";
                    greenGraph.xAxis = "x";
                    greenGraph.yField = "y";
                    greenGraph.lineAlpha = 0;
                    greenGraph.lineColor = '#B1D62B';
                    greenGraph.bulletField = 'bullet';
                    greenGraph.bulletSize = scope.bulletSize;
                    greenGraph.valueAxis="Not set";
                    greenGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value]]</b>";
                    chart[chartGrade].addGraph(greenGraph);

                    var redGraph = new AmCharts.AmGraph();
                    redGraph.xField = "x2";
                    redGraph.yField = "y2";
                    redGraph.lineAlpha = 0;
                    redGraph.lineColor = '#ff0000';
                    redGraph.bulletField = 'bullet2';
                    redGraph.bulletSize = scope.bulletSize;
                    redGraph.valueAxis="Not set";
                    redGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value2]]</b>";
                    chart[chartGrade].addGraph(redGraph);

                    var blueGraph = new AmCharts.AmGraph();
                    blueGraph.xField = "x3";
                    blueGraph.yField = "y3";
                    blueGraph.lineColor = '#0000ff';
                    blueGraph.bulletField = 'bullet3';
                    blueGraph.bulletSize = 1;
                    blueGraph.valueAxis="Not set";
                    blueGraph.showBalloon = false;
                    chart[chartGrade].addGraph(blueGraph);

                    chart[chartGrade].write(chartName);
                    chart[chartGrade].validateData();

                    // check me out, too fast for AmCharts!
                    setTimeout(function(){ chart[chartGrade].validateNow(); }, 10);
                });
            }
        };
    });

    system2.directive("lineChart", function(){
        return {
            restrict: "E",
            transclude: true,
            template: "<div id='linechart{{grade}}' ng-show='showChart' ng-style='{{getLineChartStyle(grade)}}'></div>",
            link: function(scope, element, attrs){
                var chartGrade = attrs['grade'];
                var chartName = 'linechart' + chartGrade;

                // XY Chart
                if(typeof lineChart === 'undefined' || lineChart === null){
                    var lineChart = [];
                }

                scope.$watch('lineChartStyles', function(val){
                    if(scope.linechartData == undefined || scope.linechartData == null) return;
                    if(lineChart[chartGrade] === undefined)return;
                    console.log('redrawing ' + chartName + '...');
                    lineChart[chartGrade].write(chartName);
                    setTimeout(function(){ lineChart[chartGrade].validateNow(); }, 10);
                }, true);

                scope.$watch('linechartData', function(val){
                    if(val== undefined || val == null) return;
                    console.log('updating Chart data for ' + chartName);
                    lineChart[chartGrade] = new AmCharts.AmSerialChart();
                    var wc = lineChart[chartGrade];

                    wc.pathToImages = "/amcharts/images/";
                    wc.startDuration = 0;
                    wc.autoMargins = false;
                    wc.autoMarginOffset = 40;
                    wc.marginBottom = 100;
                    wc.marginLeft = 60;
                    wc.marginRight = 60;
                    wc.dataProvider = val[chartGrade];
                    // AXES
                    // Category
                    var category = wc.categoryAxis;
                    category.autoRotateAngle = 0;
                    category.labelRotation = 90;
                    //category.labelOffset = 60;
                    wc.categoryField = "student";

                    var scoreAxis = new AmCharts.ValueAxis();
                    scoreAxis.title = "Score";
                    scoreAxis.position = "left";
                    scoreAxis.id = "aScore";
                    wc.addValueAxis(scoreAxis);

                    // growth
                    var growthAxis = new AmCharts.ValueAxis();
                    growthAxis.title = "Growth";
                    growthAxis.position = "right";
                    growthAxis.id = "aGrowth";
                    wc.addValueAxis(growthAxis);

                    // logarithmic trend
                    //var tLog = new AmCharts.ValueAxis();
                    //tLog.id = "aLog";
                    //tLog.position = "right";
                    //wc.addValueAxis(tLog);


                    // GRAPHS
                    var gScore = new AmCharts.AmGraph();
                    gScore.columnWidth = 1;
                    gScore.cornerRadiusTop = 8;
                    gScore.dashLength = 4;
                    gScore.fillAlphas = 1;
                    gScore.id = "gScore";
                    gScore.lineAlpha = 1;
                    gScore.type = "column";
                    gScore.valueField = "score";
                    wc.addGraph(gScore);

                    var gGrowth = new AmCharts.AmGraph();
                    gGrowth.bullet = "square";
                    gGrowth.bulletSize = 5;
                    gGrowth.id = "gGrowth";
                    gGrowth.title = "Growth";
                    gGrowth.valueAxis = "aGrowth";
                    gGrowth.valueField = "growth";
                    wc.addGraph(gGrowth);

                    //var gTrend = new AmCharts.AmGraph();
                    //gTrend.bullet = "round";
                    //gTrend.id = "gTrend";
                    //gTrend.title = "";
                    //gTrend.valueAxis = "aLog";
                    //gTrend.valueField = "trend";
                    //wc.addGraph(gTrend);



                    lineChart[chartGrade].validateData();
                    lineChart[chartGrade].write(chartName);
                    // check me out, too fast for AmCharts!
                    setTimeout(function(){ lineChart[chartGrade].validateNow(); }, 10);
                });
            }
        };
    });

    system2.directive("printLineChart", function(){
        return {
            restrict: "E",
            transclude: true,
            template: "<div id='printLinechart{{grade}}' ng-show='showChart' ng-style='{{printChart}}'></div>",
            link: function(scope, element, attrs){
                var chartGrade = attrs['grade'];
                var chartName = 'printLinechart' + chartGrade;

                // XY Chart
                if(typeof lineChart === 'undefined' || lineChart === null){
                    var lineChart = [];
                }

                scope.$watch('linechartData', function(val){
                    if(val== undefined || val == null) return;
                    console.log('updating Chart data for ' + chartName);
                    lineChart[chartGrade] = new AmCharts.AmSerialChart();
                    var wc = lineChart[chartGrade];

                    wc.pathToImages = "/amcharts/images/";
                    wc.startDuration = 0;
                    wc.autoMargins = false;
                    wc.autoMarginOffset = 40;
                    wc.marginBottom = 100;
                    wc.marginLeft = 60;
                    wc.marginRight = 60;
                    wc.dataProvider = val[chartGrade];
                    // AXES
                    // Category
                    var category = wc.categoryAxis;
                    category.autoRotateAngle = 0;
                    category.labelRotation = 90;
                    //category.labelOffset = 60;
                    wc.categoryField = "student";

                    var scoreAxis = new AmCharts.ValueAxis();
                    scoreAxis.title = "Score";
                    scoreAxis.position = "left";
                    scoreAxis.id = "aScore";
                    wc.addValueAxis(scoreAxis);

                    // growth
                    var growthAxis = new AmCharts.ValueAxis();
                    growthAxis.title = "Growth";
                    growthAxis.position = "right";
                    growthAxis.id = "aGrowth";
                    wc.addValueAxis(growthAxis);

                    // logarithmic trend
                    //var tLog = new AmCharts.ValueAxis();
                    //tLog.id = "aLog";
                    //tLog.position = "right";
                    //wc.addValueAxis(tLog);


                    // GRAPHS
                    var gScore = new AmCharts.AmGraph();
                    gScore.columnWidth = 1;
                    gScore.cornerRadiusTop = 8;
                    gScore.dashLength = 4;
                    gScore.fillAlphas = 1;
                    gScore.id = "gScore";
                    gScore.lineAlpha = 1;
                    gScore.type = "column";
                    gScore.valueField = "score";
                    wc.addGraph(gScore);

                    var gGrowth = new AmCharts.AmGraph();
                    gGrowth.bullet = "square";
                    gGrowth.bulletSize = 5;
                    gGrowth.id = "gGrowth";
                    gGrowth.title = "Growth";
                    gGrowth.valueAxis = "aGrowth";
                    gGrowth.valueField = "growth";
                    wc.addGraph(gGrowth);

                    //var gTrend = new AmCharts.AmGraph();
                    //gTrend.bullet = "round";
                    //gTrend.id = "gTrend";
                    //gTrend.title = "";
                    //gTrend.valueAxis = "aLog";
                    //gTrend.valueField = "trend";
                    //wc.addGraph(gTrend);



                    lineChart[chartGrade].validateData();
                    lineChart[chartGrade].write(chartName);
                    // check me out, too fast for AmCharts!
                    setTimeout(function(){ lineChart[chartGrade].validateNow(); }, 10);
                });
            }
        };
    });

    system2.directive("datasummary", function(){
        return{
            restrict: "E",
            transclude: true,
            link: function(scope, element, attrs){
                var grade = attrs['grade'];
                var avg = [];
                var median = [];
                var min = [];
                var max = [];
                var stdDev = [];
                var breakDowns = ['score1', 'score2', 'growth'];

                scope.$watch('studentsUpdated', function(val){
                    if(val=== undefined){ return;}

                    var StudentData = scope.GetStudentData();
                    avg["score1"] = StudentData.AverageScore1(grade).toFixed(2);
                    avg["score2"] = StudentData.AverageScore2(grade).toFixed(2);
                    avg["growth"] = StudentData.AverageGrowth(grade).toFixed(2);

                    var minMax = StudentData.MinMaxGrowth(grade);
                    min["growth"] = minMax[0];
                    max["growth"] = minMax[1];

                    minMax = StudentData.MinMaxScore1(grade);
                    min["score1"] = minMax[0];
                    max["score1"] = minMax[1];

                    minMax = StudentData.MinMaxScore2(grade);
                    min["score2"] = minMax[0];
                    max["score2"] = minMax[1];

                    stdDev["growth"] = StudentData.GrowthStandardDev(grade).toFixed(2);
                    stdDev["score1"] = StudentData.Score1StandardDev(grade).toFixed(2);
                    stdDev["score2"] = StudentData.Score2StandardDev(grade).toFixed(2);

                    median["growth"] = ((min["growth"]+max["growth"])/2).toFixed(2);
                    median["score1"] = ((min["score1"]+max["score1"])/2).toFixed(2);
                    median["score2"] = ((min["score2"]+max["score2"])/2).toFixed(2);

                    var tableHtml = "<table class='table'>";
                    tableHtml += "<tr><td>&nbsp;</td><td>Assessment 1</td><td>Assessment 2</td><td>Growth</td></tr>";
                    tableHtml += "<tr><td>Mean</td><td>" + avg["score1"] + "</td><td>" + avg["score2"] + "</td><td>" + avg["growth"] + "</td></tr>";
                    tableHtml += "<tr><td>Median</td><td>" + median["score1"] + "</td><td>" + median["score2"] + "</td><td>" + median["growth"] + "</td></tr>";
                    tableHtml += "<tr><td>Minimum</td><td>" + min["score1"] + "</td><td>" + min["score2"] + "</td><td>" + min["growth"] + "</td></tr>";
                    tableHtml += "<tr><td>Maximum</td><td>" + max["score1"] + "</td><td>" + max["score2"] + "</td><td>" + max["growth"] + "</td></tr>";
                    tableHtml += "<tr><td>Standard Deviation</td><td>" + stdDev["score1"] + "</td><td>" + stdDev["score2"] + "</td><td>" + stdDev["growth"] + "</td></tr>";
                    tableHtml += "</table>";

                    var tableElement = angular.element(tableHtml);
                    element.append(tableElement);
                }, true);
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
            if(typeof grade === 'undefined' || grade === null){
                return studentData.Data;
            }

            grade = Number(grade);
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

        studentData.Score2s = function (grade) {
            var data = studentData.DataByGrade(grade);
            return data.map(function (student) {
                return student.score2;
            });
        }

        studentData.Score1s = function (grade) {
            var data = studentData.DataByGrade(grade);
            return data.map(function (student) {
                return student.score1;
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

        studentData.AverageScore1 = function(grade){
            return ArrayMath.Average(this.Score1s(grade));
        }

        studentData.AverageScore2 = function(grade){
            return ArrayMath.Average(this.Score2s(grade));
        }

        studentData.MinMaxGrowth = function(grade){
            var min = ArrayMath.Min(this.Growths(grade));
            var max = ArrayMath.Max(this.Growths(grade));
            return [min,max];
        }

        studentData.MinMaxScore1 = function(grade){
            var min = ArrayMath.Min(this.Score1s(grade));
            var max = ArrayMath.Max(this.Score1s(grade));
            return [min,max];
        }

        studentData.MinMaxScore2 = function(grade){
            var min = ArrayMath.Min(this.Score2s(grade));
            var max = ArrayMath.Max(this.Score2s(grade));
            return [min,max];
        }

        studentData.GrowthStandardDev = function(grade){
            return ArrayMath.StandardDeviation(this.Growths(grade));
        }

        studentData.Score1StandardDev = function(grade){
            return ArrayMath.StandardDeviation(this.Score1s(grade));
        }

        studentData.Score2StandardDev = function(grade){
            return ArrayMath.StandardDeviation(this.Score2s(grade));
        }

        studentData.WithinStandardDevPlotpoints = function (grade) {
            var topScore = this.AverageScore2(grade) + this.Score2StandardDev(grade);
            var bottomScore = this.AverageScore2(grade) - this.Score2StandardDev(grade);
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
            var topScore = this.AverageScore2(grade) + this.Score2StandardDev(grade);
            var bottomScore = this.AverageScore2(grade) - this.Score2StandardDev(grade);
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

    system2.controller("sys2Ctrl", function($compile, $scope, $http, Student, StudentData){
        var app = this;
        console.log('init controller...');
        $scope.students = [];
        //$scope.grades = [];
        $scope.bulletSize = 10;
        $scope.xyChartStyles = [];
        $scope.lineChartStyles = [];
        $scope.showForm = false;
        $scope.showChart = false;
        $scope.showFile = true;
        $scope.showChoice = true;
        $scope.showSuccess = false;
        $scope.studentsUpdated;

        $scope.smallChart = {"width": "360px", "height": "280px"};
        $scope.largeChart = {"width": "800px", "height": "600px"};
        $scope.printChart = {"width": "1000px", "height": "600px"};

        $scope.GetStudentData = function(){ return StudentData; };

        $scope.$on('studentDataUpdated', function(){
            $scope.students = StudentData.Data;
            $scope.grades = StudentData.Grades();
        });

        // start by loading up some empty students
        for(var x = 0;x<5;x++){
            StudentData.AddStudent(new Student('Student '+ x));
        }

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

                $scope.showForm=true;
                $scope.showSuccess =true;
                $scope.showChoice=false;
                $scope.showFile = false;
                $scope.$apply();
                $('#one').addClass('numberCircleDone');
                $('#two').addClass('numberCircleSelected');
                $('#directionText').hide();
                $('#fixedButton').show();

            };
            reader.readAsText(file);
        };

        $scope.addStudent = function(){
            StudentData.AddStudent(new Student());
        };

        $scope.showInputForm = function(){
            $scope.showForm=true;
            $scope.showChoice = false;
            $('#directionText').html('Enter Student Test Data | <a style="font-size: 12px;"  href="javascript:history.go(0)"> Go Back, and upload a CSV File </a>')
            $('#fixedButton').show();
        };
        $scope.processStudents = function() {
            $scope.$broadcast('studentDataUpdated');
            $scope.xychartData = [];
            $scope.linechartData = [];
            console.log("processing students...");
            StudentData.Grades().forEach(function(value, idx, arr){
                var targetGrade = value;
                var greenPoints = StudentData.WithinStandardDevPlotpoints(targetGrade);
                var redPoints = StudentData.WithoutStandardDevPlotpoints(targetGrade);
                var bluePoints = StudentData.TrendLinePoints(targetGrade).sort(function (a, b) {
                    return a[0] - b[0]
                });
                var newChartData = [];
                var defaultx = StudentData.AverageScore2(targetGrade);
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

                $scope.xychartData[targetGrade] = newChartData;

                // build the line chart data;
                var newLineData = [];
                StudentData.Plotpoints(targetGrade).sort(function(a,b){return a[0]-b[0]}).forEach(function(value, idx, arr){
                    var obj = {};
                    obj.student = value[2];
                    obj.score = value[0];
                    obj.growth = value[1];
                    obj.trend = value[0]; // dummy placeholder for now.
                    newLineData.push(obj);
                });

                $scope.linechartData[targetGrade] = newLineData;
            });

            StudentData.Grades().forEach(function(value, idx, arr) {
                var targetGrade = value;
                $scope.xyChartStyles[targetGrade] = $scope.smallChart;
                $scope.lineChartStyles[targetGrade] = $scope.smallChart;
            });


            $('#one').addClass('numberCircleDone');
            $('#two').addClass('numberCircleDone');
            $('#three').addClass('numberCircleSelected');
            $('#directionText').hide();
            $('#fixedButton').hide();
            console.log('updating students');
            $scope.studentsUpdated = Date.now();
        };

        $scope.getXyChartStyle = function(grade){
            var style = $scope.xyChartStyles[grade];
            if(style === undefined) return $scope.smallChart;
            return style;
        };

        $scope.getLineChartStyle = function(grade){
            var style = $scope.lineChartStyles[grade];
           if(style === undefined) return $scope.smallChart;
            return style;
        };

        $scope.showLargeChart = function(chartType, grade){
            $scope.bulletSize = 10;
            if(chartType === "lineChart"){
                var targetDiv = $('#linechart' + grade)[0];
                var chartStyles = $scope.lineChartStyles;
            }

            if(chartType === "xyChart"){
                var targetDiv = $('#xychart' + grade)[0];
                var chartStyles = $scope.xyChartStyles;
            }

            targetDiv.setAttribute("style", "width: 800px; height: 600px; overflow: hidden; text-align: left;");
            chartStyles[grade] = $scope.largeChart;
        };


        $scope.showSmallChart = function(chartType, grade){
            $scope.bulletSize = 1;
            if(chartType === "lineChart"){
                var targetDiv = $('#linechart' + grade)[0];
               targetDiv.setAttribute("style", "width: 360px; height: 280px; overflow: hidden; text-align: left;");
                $scope.lineChartStyles[grade] = $scope.smallChart;
            }

            if(chartType === "xyChart"){


                var targetDiv = $('#xychart' + grade)[0];
               targetDiv.setAttribute("style", "width: 360px; height: 280px; overflow: hidden; text-align: left;");
               $scope.xyChartStyles[grade] = $scope.smallChart;
            }
        }

        $scope.saveGradeToPdf = function(grade){
            console.log("saving pdf...");
            $('#printChartDiv' + grade)[0].setAttribute('style', '');
            AmCharts.charts.forEach(function(chart, idx,arr){
                chart.validateNow();
            });
            $('#printChartDiv' + grade)[0].setAttribute('style', 'display:none;');
            var printDivName = "#printDiv" + grade + ' datasummary';
            var svgCollSelector = "#printDiv" + grade + " svg";
            var svgColl = $(svgCollSelector);
            var chartData = [];
            var images = [];

            for(var x=0; x<svgColl.length;x++){
                var svg = svgColl[x];
                var svgData = new XMLSerializer().serializeToString(svg);

                images[x] = new Image();
                images[x].width = 1000;
                images[x].height = 600;
                images[x].src = "data:image/svg+xml;base64," + btoa(svgData);

                images[x].onload = function(){
                    var img = this;
                    $('#holder')[0].appendChild(img);
                    setTimeout(function(){
                        var canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        //$('#printDiv'+grade)[0].appendChild(canvas);
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img,0,0);
                        chartData.push(canvas.toDataURL("image/png"));

                        if(chartData.length == 2){
                            var pdf = new jsPDF('l', 'pt', 'letter');
                            var source = $(printDivName).first()[0];
                            var imgSource = 'data:image/png;base64,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';
                            pdf.addImage(imgSource, 'JPEG', 20, 20, 180, 60);
                            pdf.text(25, 120, "System 2 Report");
                            pdf.fromHTML(source, 20, 140,{'width': 10});
                            for(var x=0;x<chartData.length;x++){
                                pdf.addPage();
                                pdf.addImage(imgSource, 'JPEG', 20, 20, 60, 20);
                                pdf.text(25, 80, "ILASCD System 2 Report");
                                pdf.addImage(chartData[x], 'png', 15, 110);
                            }

                            pdf.save('Grade ' + grade + ' Analysis.pdf');
                            $('#holder')[0].innerHTML = "";
                            $('#printChartDiv' + grade)[0].hide();
                        }
                    }, 100);



                };
            }
        }

        $scope.putChartInModal = function(num, type){

            var chartSelector;
            if(type==="lineChart"){
                chartSelector = '#linechart' + num;
            }

            if( type === "xyChart"){
                chartSelector = '#xychart' + num;
            }



            var targetChart = $(chartSelector);
            targetChart[0].setAttribute("style", "width: 800px; height: 600px; overflow: hidden; text-align: left;");
            $(chartSelector).hide();//hiding stuff...

            setTimeout(function() {
                //wait to put it in its happy place...

                //wrap chart svg in to modal body //$('#linechart' + grade)[0]
                targetChart.wrap('<div class="modal-body" > </div>' );
                //wrap modal body in greater modal
                $('.modal-body').wrap('<div id="chartModal" class="modal  fade" tabindex="-1" data-width="760"> </div>');
                //add close button and header
                $( '<div class="modal-header"><button ng-click="putChartBack('+num+',\''+ type +'\')" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3>Assessment Chart</h3></div>' ).prependTo( "#chartModal" );

                //var parentModal = angular.element('<div id="chartModal" class="modal  fade" tabindex="-1" data-width="760"> </div>');
                //parentModal.app


                //place things in the correct location in DOM
                var item = $('#chartModal');  // item to move
                var want = $('.mainpanel');  // container to receive it
                item.remove();
                want.append($compile(item)($scope));

                //show chart

                $('#chartModal').modal('show');
                $(chartSelector).show();

            }, 50);




            setTimeout($scope.showLargeChart(type, num), 500);





        };


        $('#cancelButton').click(function() {
            location.reload();
        });



        $(document).on('click', 'a.delete-row', function () { //
            //alert("aa");
            $(this).closest('tr').remove();
            return false;
        });






        $scope.putChartBack = function(grade, type){

            //closeChart

            var getHTML = $('.modal-body').html()


            //remove svg from modal

            $('.modal-body ').remove();

            //add to DOM again!!!!
            var chartTypeSelector;
            var chartSelector;
            if (type === "xyChart"){
                chartTypeSelector = 'xy-chart[grade="' + grade + '"]';
                chartSelector = '#xychart' + grade;
            }
            if(type === "lineChart"){
                chartTypeSelector = 'line-chart[grade="' + grade + '"]';
                chartSelector = '#linechart' + grade;
            }
            var targetDiv = $(chartTypeSelector)[0];
            targetDiv.innerHTML = getHTML;
            $('#chartModal').remove();
            $('.modal-backdrop').remove();
            $scope.showSmallChart(type, grade);
        }
    });
})();



