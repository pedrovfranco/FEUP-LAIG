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

parseAnimations(animationsNode)
{
    var children = animationsNode.children;

    this.animations = [];
    var numAnimations = 0;

    var grandChildren = [];

    for (var i = 0; i < children.length; i++)
   {
     var animationId = this.reader.getString(children[i], 'id');

     // Checks for error on getString
     if (animationId == null)
         return "no ID defined for animation";

     // Checks for repeated IDs.
     if (this.animations[animationId] != null)
         return "ID must be unique for each animation (conflict: ID = " + animationId + ")";

         var span = this.reader.getFloat(children[i],'span');

         this.animations[animationId] = [];
         this.animations[animationId][0] = this.reader.getFloat(grandChildren[i], 'span');

         grandChildren = children[i].children;

         if (children[i].nodeName != "linear" && children[i].nodeName != "circular")
         {
           this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
           continue;
         }

      if (children[i].nodeName == "linear")
      {

        var xx,yy,zz;

        for (var j = 0; j < grandChildren.length; j++)
        {
          if(grandChildren[j].nodeName == "controlpoint")
          {
            xx = this.reader.getFloat(grandChildren[j], 'xx');
            yy = this.reader.getFloat(grandChildren[j], 'yy');
            zz = this.reader.getFloat(grandChildren[j], 'zz');

            if (!(this.isValid(xx) && this.isValid(yy) && this.isValid(zz)))
                return "Unable to parse animation id=\"" + animationId + "\" on the \"" + grandChildren[j].nodeName + "\" node";

            this.animations[animationId][1] = [];
            this.animations[animationId][1][0] = xx;
            this.animations[animationId][1][1] = yy;
            this.animations[animationId][1][2] = zz;
          }
        }
      }
    else if (children[i].nodeName == "circular")
    {
      var center, radius, startang, rotang;

      center[] = this.reader.getFloat(children[i],'center').split(" ");
      radius = this.reader.getFloat(children[i],'radius');
      startang = this.reader.getFloat(children[i],'startang');
      rotang = this.reader.getFloat(children[i],'rotang');

    }
 }
}
