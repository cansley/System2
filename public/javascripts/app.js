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
                        var student = new Student(arr.slice(0, -3).join(), arr[arr.length-3], Number(arr[arr.length-2]), Number(arr[arr.length-1]));
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
                            var imgSource = 'data:image/png;base64,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bW3V638zC3589WpPefqCVCpdtWrVQw8+yGqDOjo6XnvttX//+9++DB0rKip8aVdjx47dsHGj+xG5XK5WqznZSKvVfv7558XFxQmJibGxsXFxcUKBoLGxUaPRqNXq0tJSTlOVk5Oz4KabBnyTAAAoRfWJVEgsGpuklAoPFWuMNp98jnGEhxG3jkkanRAeJRVeq3qGvrj11lvbWlvfeust1u6VYZjGxkatVisQCNhpLxdJ2m02q9Xqbhh751133XHnnaHTuGRlZclkMnd1xXCYieBob2/3EsA81PGkQkpra6svTo19eRwWi4XTwXgiPz//ufXrA/eegKLo448/7nA6Pz9wgD1CkmRNTU1dXR07gUsQhNPpZF2YcvoPFEWfWru2oKAgwKt7JzY2dt2zz/5p7VrWPokkybq6Oo1GIxAI2FLZ7XZ3T6c4jj/zl7/4HonIaDT2W89jx41bt26d78Me98iVXvB72hFBkMVLlnz55Zdnz571L4fQERsb+39///sLzz9f371s3tjZef78+dLSUvariKIo25AcDgfXWycmJW18/nkvLZkgiEceeaSmupoLA2w2m389ffpScbFIJMJx3GyxWMxmd+XcPcuWLV261IvSV6FQbNiw4YnVq7lZP41G09zcLBKJwsLCnE6n0Wjs4Upq2b333nXXXQEGCZg2bdqUKVM4he6xo0dPnDjhy6S8yWTypV311pgqlcp//OMfGzZsqKmp4bK6ePHilStX2H4KwzC73W61Wt0fSkxMzPMvvOD3ym4oRfVNhJg/c4QqI1pyulp3srLF6uy/wwsPI8anRE5KiUqKFIuI31vFRkVFPfjQQ2lpaW+88QZnFEXTNBs3o8+f3Ld8+WOPPRZSR4UCgSAvL8992iXoQYghQ4tYLL777rvvuOMOX8Jv+UJKauozzzyTM3Lku+++y1lFUBRlNps5vYI7BEH86emnly5dGnSfWz1AUXTevHm1tbWvbtnCHfTyij388MM33XRTsDwvSKXSpUuXLrnjDjYe8PBBLpc/9dRTy5cvH26jDoIgZs6cGRER8f7773998CAn4DocDofD0afPuaysrJdefjk/P997ziqVauPzz8fHx+/Zs4e9a5qmPbXPe+6558knn+z3Mzty5MjNmze/8cYbnAGcy+Xq0zeeSCR65NFHly5dGh4e7j3PfgkLC3vsscd++eUXVuYz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';
                            pdf.addImage(imgSource, 'JPEG', 20, 20, 240, 80);
                            pdf.text(25, 120, "System 2 Report");
                            pdf.fromHTML(source, 20, 140,{'width': 10});
                            for(var x=0;x<chartData.length;x++){
                                pdf.addPage();
                                pdf.addImage(imgSource, 'JPEG', 20, 20, 80, 25);
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



