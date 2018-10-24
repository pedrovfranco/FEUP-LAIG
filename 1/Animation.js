class Animation
{
    constructor(scene)
    {

    };
}

class LinearAnimation extends Animation
{
    constructor(scene, controlPoints, time)
    {
        super(scene);

        var length = controlPoints.length;
        var P, intervalTime = (length-1)/time;
        var i, u;

        for(i = 0; i <  length - 1 ; i++)
        {
          for ( u = 0; u < intervalTime; u++ )
          {
            P[0] = controlPoints[i][0] + ( controlPoints[i+1][0]-controlPoints[i][0] ) * u / intervalTime;
            P[1] = controlPoints[i][1] + ( controlPoints[i+1][1]-controlPoints[i][1] ) * u / intervalTime;
            P[2] = controlPoints[i][2] + ( controlPoints[i+1][2]-controlPoints[i][2] ) * u / intervalTime;
          }
        }
    };
}


class CircularAnimation extends Animation
{

    constructor(scene, center, radius, initialAngle, rotationAngle,time)
    {
        super(scene);

        var radiusPerSecond = rotationAngle / time;

        var s = radius * rotationAngle;

        var alpha = initialAngle;
        
        var i,u;

        //for ( i = 0; i < ;i++)

        // radius * Math.cos(alpha) + center[0], radius * Math.sin(alpha) + center[1], 0 + center[2]
    };
    
}