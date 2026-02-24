from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from .models import Base, Object, Exercise, ObjectExercise


def seed():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    # --- Alte Daten löschen ---
    db.query(ObjectExercise).delete()
    db.query(Exercise).delete()
    db.query(Object).delete()
    db.commit()

    # --- Objekte ---
    chair = Object(name="chair")
    bottle = Object(name="bottle")
    backpack = Object(name="backpack")
    desk = Object(name="desk")
    none_obj = Object(name="none")

    db.add_all([chair, bottle, backpack, desk, none_obj])
    db.commit()

    # --- Chair ---
    exercises_chair = [
        Exercise(
            name="Chair-Squat",
            description="10 repetitions. Position yourself about 10 cm in front of your chair. Lower your body into a squat by bending your knees and hips. As soon as your buttocks lightly touch the chair, push through your heels and straighten your legs to return to the starting position.",
            category="Strengthening",
            office=False,
            duration=60,
            video_url="/videos/Chair-Squat.mp4"
        ),
        Exercise(
            name="Seated Calf Raises",
            description="10 repetitions. Sit upright on the chair and slide forward slightly so that part of your thighs are no longer supported. Lift your heels off the floor by pushing through the balls of your feet, feeling tension in your calves, then slowly lower them again.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Seated Calf Raises.mp4"
        ),
        Exercise(
            name="Seated Isometric Hip Flexor Strengthening",
            description="25s per side. Sit upright on the chair. Lift one leg so that the knee is elevated and hold this position. You should feel tension in the front of your thigh. Keep your posture upright and stable while holding.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Seated Isometric hip flexor strenghening.mp4"
        ),
        Exercise(
            name="Seated One-legged Knee Extension",
            description="8 repetitions per side. Sit upright on the chair. Extend one leg fully in front of you until it is straight, hold the tension briefly, then lower it back down. Alternate sides while maintaining an upright posture.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Seated One-legged knee extension.mp4"
        ),
        Exercise(
            name="Abdominal and Hip Flexor Combination",
            description="8 repetitions per side. Sit upright and place both hands behind your head. Alternately lift one knee while rotating your upper body so that the opposite elbow moves toward the knee. Keep your movements controlled.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Abdominal and hip flexor combination.mp4"
        ),
        Exercise(
            name="Side Bend",
            description="8 repetitions per side. Sit upright on the chair. Place one hand behind your head and let the other arm hang down. Slowly bend your upper body sideways toward the hanging arm, then return to the center. Keep your hips stable.",
            category="Mobilisation",
            office=True,
            duration=60,
            video_url="/videos/Side bend.mp4"
        ),
        Exercise(
            name="Seated Upper Body Rotation",
            description="8 repetitions per side. Sit upright and cross your arms in front of your chest. Rotate your upper body to the right and left as far as comfortably possible while keeping your hips facing forward.",
            category="Mobilisation",
            office=True,
            duration=60,
            video_url="/videos/Seated upper body rotation.mp4"
        ),
        Exercise(
            name="Internal Hip Rotation",
            description="8 repetitions per side. Stand on one leg and lift the other leg so that your hip and knee form a 90-degree angle. Slowly rotate the raised knee inward while maintaining balance, then return to the starting position.",
            category="Mobilisation",
            office=False,
            duration=60,
            video_url="/videos/Internal Hip Rotation.mp4"
        ),
        Exercise(
            name="External Hip Rotation",
            description="8 repetitions per side. Stand on one leg and lift the other leg with the hip and knee at 90 degrees. Rotate the knee outward as far as possible while keeping the rest of your body stable.",
            category="Mobilisation",
            office=False,
            duration=60,
            video_url="/videos/External Hip Rotation.mp4"
        ),
        Exercise(
            name="Foot Circles",
            description="8 repetitions per side. While seated, lift one foot slightly off the floor and rotate your ankle in large circles. Change direction and then switch to the other foot.",
            category="Mobilisation",
            office=True,
            duration=120,
            video_url="/videos/Foot Circles.mp4"
        ),
        Exercise(
            name="Chest Opening",
            description="16 repetitions. Sit upright and stretch both arms forward with palms touching. Open your arms outward as far as possible until they move behind your body, opening your chest and squeezing your shoulder blades together.",
            category="Mobilisation",
            office=True,
            duration=60,
            video_url="/videos/Chest Opening.mp4"
        ),
        Exercise(
            name="Chin to Chest",
            description="Hold for 2x30s . Sit upright and gently bring your chin toward your chest. You may apply light pressure with your hands on the back of your head to deepen the stretch. Hold steadily.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Chin to Chest.mp4"
        ),
        Exercise(
            name="Back Shoulder Stretch",
            description="30s per side. Extend one arm across your chest and use the opposite hand to gently pull the arm closer to your body until you feel a stretch in the back of your shoulder. Hold and switch sides.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Back Shoulder Stretch.mp4"
        ),
        Exercise(
            name="Chest and Front Shoulder Stretch",
            description="Hold for 2x30s. Interlock your fingers behind your back and gently lift your arms upward while pushing your chest forward. You should feel a stretch across your chest and shoulders.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Chest and Front Shoulder Stretch.mp4"
        ),
        Exercise(
            name="Seated Gluteus Stretch",
            description="30s per side. Place one ankle on the opposite thigh while seated. Gently press down on the raised knee until you feel a stretch in your buttocks. Keep your back straight.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Seated Gluteus Stretch.mp4"
        ),
        Exercise(
            name="Back Thigh Stretch",
            description="30s per side. Sit upright and extend one leg forward. Lean your upper body toward the extended leg until you feel a stretch in the back of your thigh. Hold and switch sides.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Back Thigh Stretch.mp4"
        ),
        Exercise(
            name="Upper Body Stretch with Arms Extended",
            description="Hold for 2x 30s. Stretch both arms overhead and interlace your fingers. Reach upward to lengthen your spine and upper body while breathing steadily.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Upper Body stretch with Arms extended.mp4"
        ),
    ]

    # --- Bottle ---
    exercises_bottle = [
        Exercise(
            name="Side Bend with Bottle",
            description="8 repetitions per side. Hold the bottle in one hand and let the arm hang down. Place the other hand behind your head. Slowly bend your upper body sideways toward the bottle, then return to the upright position.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Side bend with bottle.mp4"
        ),
        Exercise(
            name="Z-Press with Bottle",
            description="8 repetitions per side. Sit upright and hold the bottle at ear level with your forearm vertical. Press the bottle upward until your arm is fully extended, then slowly lower it back down.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Z-Press with bottle.mp4"
        ),
        Exercise(
            name="One-sided Shoulder Lift with Bottle",
            description="8 repetitions per side. Hold the bottle at your side and slowly lift your arm out to the side until it reaches shoulder height. Lower it back down with control.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/One-sided shoulder lift with bottle.mp4"
        ),
        Exercise(
            name="One-sided Front Lift with Bottle",
            description="8 repetitions per side. Hold the bottle in front of your thigh and lift your arm forward until it reaches shoulder height. Keep your torso upright throughout the movement.",
            category="Strengthening",
            office=False,
            duration=60,
            video_url="/videos/One-sided front lift with bottle.mp4"
        ),
    ]

    # --- Backpack ---
    exercises_backpack = [
        Exercise(
            name="Two-armed Rowing with Bag",
            description="8 repetitions. Hold the backpack with both hands and lean slightly forward. Pull the bag toward your chest by bending your elbows and squeezing your shoulder blades together.",
            category="Strengthening",
            office=False,
            duration=60,
            video_url="/videos/Two-armed Rowing with bag.mp4"
        ),
        Exercise(
            name="One-armed Rowing with Bag",
            description="8 repetitions per side. Hold the backpack in one hand and support yourself with the other hand on your thigh. Pull the bag upward toward your torso while keeping your back straight.",
            category="Strengthening",
            office=False,
            duration=60,
            video_url="/videos/One-armed Rowing with bag.mp4"
        ),
        Exercise(
            name="Upright Rowing with Bag",
            description="10 repetitions. Hold the backpack with both hands in front of your body. Pull it upward toward your chin, keeping your elbows lifted outward.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Upright Rowing with bag.mp4"
        ),
    ]

    # --- Desk ---
    exercises_desk = [
        Exercise(
            name="Single-leg Hip Extensions in Forward Bend",
            description="25s per side. Lean forward and support yourself on the desk. Lift one leg straight back until you feel tension in your glutes and hamstrings. Alternate legs.",
            category="Strengthening",
            office=False,
            duration=60,
            video_url="/videos/Single-leg hip extensions in forward bend.mp4"
        ),
        Exercise(
            name="Table Push-ups",
            description="8 repetitions. Place your hands on the desk and step your feet back. Lower your chest toward the table by bending your arms, then push yourself back up.",
            category="Strengthening",
            office=False,
            duration=90,
            video_url="/videos/Table Push-ups.mp4"
        ),
        Exercise(
            name="Upper Body Stretch in Forward Bend",
            description="Hold for 2x30s. Lean forward with your hands resting on the desk and let your head drop between your arms. Feel the stretch along your back and shoulders.",
            category="Stretching",
            office=False,
            duration=60,
            video_url="/videos/Upper Body Stretch in forward Bend.mp4"
        ),
    ]

    # --- None ---
    exercises_none = [
        Exercise(
            name="Standing Single-leg Bending",
            description="25s per side. Stand upright and lift one leg so that the hip and knee are bent at 90 degrees. Hold this position while maintaining balance and posture.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Standing Single-leg bending.mp4"
        ),
        Exercise(
            name="Forward Lunge",
            description="5 repetitions per side. Step forward into a lunge, bending both knees to approximately 90 degrees while keeping your torso upright. Push back to the starting position and switch sides.",
            category="Strengthening",
            office=False,
            duration=90,
            video_url="/videos/Forward Lunge.mp4"
        ),
        Exercise(
            name="Sideward Lunge",
            description="5 repetitions per side. Step out to the side and bend the stepping knee while keeping the other leg straight. Push back to the center and alternate sides.",
            category="Strengthening",
            office=False,
            duration=90,
            video_url="/videos/Sideward Lunge.mp4"
        ),
        Exercise(
            name="Backward Lunge",
            description="5 repetitions per side. Step one leg backward into a lunge position. Lower your body until both knees are bent, then return to standing.",
            category="Strengthening",
            office=False,
            duration=90,
            video_url="/videos/Backward Lunge.mp4"
        ),
        Exercise(
            name="Standing Calf Raises",
            description="10 repetitions. Stand upright and push yourself onto the balls of your feet. Hold briefly at the top, then slowly lower your heels back down.",
            category="Strengthening",
            office=False,
            duration=60,
            video_url="/videos/Standing Calf Raises.mp4"
        ),
        Exercise(
            name="Raising Foot Arch",
            description="15 repetitions. Stand with both feet flat on the floor. Pull your toes toward your heels to activate and lift the arch of your foot.",
            category="Strengthening",
            office=True,
            duration=120,
            video_url="/videos/Raising foot arch.mp4"
        ),
        Exercise(
            name="Lateral Neck Strengthening",
            description="Hold for 25s per side. Apply gentle pressure to the side of your head with one hand while resisting the movement using your neck muscles.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Lateral Neck strengthening.mp4"
        ),
        Exercise(
            name="Front Neck Strengthening",
            description="Hold for 2x 25s. Place your hand on your forehead and gently push while resisting the pressure with your neck muscles.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Front Neck strengthening.mp4"
        ),
        Exercise(
            name="Posterior Neck Strengthening",
            description="Hold for 2x 25s. Place your hand on the back of your head and apply pressure while resisting with your neck muscles.",
            category="Strengthening",
            office=True,
            duration=60,
            video_url="/videos/Posterior Neck strengthening.mp4"
        ),
        Exercise(
            name="Cat & Cow",
            description="8 repetitions. Stand with your hands resting on your knees. Alternate between rounding your back and arching it while breathing steadily.",
            category="Mobilisation",
            office=False,
            duration=60,
            video_url="/videos/Cat and Cow.mp4"
        ),
        Exercise(
            name="Head Tilt",
            description="8 repetitions per side. Slowly tilt your head toward one shoulder, then the other, keeping your movements controlled.",
            category="Mobilisation",
            office=True,
            duration=60,
            video_url="/videos/Head Tilt.mp4"
        ),
        Exercise(
            name="Head Flexion & Extension",
            description="8 repetitions. Lower your chin toward your chest and then lift your head upward, moving through a comfortable range of motion.",
            category="Mobilisation",
            office=True,
            duration=60,
            video_url="/videos/Head Flexion and Extension.mp4"
        ),
        Exercise(
            name="Head Rotation",
            description="8 repetitions per side. Turn your head slowly to look over one shoulder, then rotate to the other side.",
            category="Mobilisation",
            office=True,
            duration=90,
            video_url="/videos/Head Rotation.mp4"
        ),
        Exercise(
            name="Shoulder Circles",
            description="12 repetitions. Touch your shoulders with your fingertips and rotate your elbows forward and backward in large circles.",
            category="Mobilisation",
            office=True,
            duration=60,
            video_url="/videos/Shoulder Circles.mp4"
        ),
        Exercise(
            name="Standing Hip Flexor Stretch",
            description="30s per side. Step into a slight lunge and gently push your hips forward until you feel a stretch in the front of your hip.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Standing Hip Flexor Stretch.mp4"
        ),
        Exercise(
            name="Hip Flexor Stretch",
            description="30s per side. Kneel on one knee with the other leg in front. Push your hips forward and raise your arms overhead to deepen the stretch.",
            category="Stretching",
            office=False,
            duration=90,
            video_url="/videos/Hip Flexor Stretch.mp4"
        ),
        Exercise(
            name="Front Thigh Stretch",
            description="30s per side. Stand on one leg and pull the heel of the other foot toward your buttocks until you feel a stretch in the front thigh.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Front Thigh stretch.mp4"
        ),
        Exercise(
            name="Calf Stretch",
            description="30s per side. Step one foot back and press the heel into the floor while bending the front knee to stretch the calf.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Calf Stretch.mp4"
        ),
        Exercise(
            name="Standing Back Thigh Stretch",
            description="30s per side. Place one heel forward and bend your upper body toward your toes until you feel a stretch in your hamstrings.",
            category="Stretching",
            office=False,
            duration=90,
            video_url="/videos/Standing Back Thigh Stretch.mp4"
        ),
        Exercise(
            name="Adductor Stretch",
            description="30s per side. Step into a wide stance and bend one knee while keeping the other leg straight to stretch the inner thigh.",
            category="Stretching",
            office=True,
            duration=90,
            video_url="/videos/Adductor Stretch.mp4"
        ),
    ]

    all_exercises = (
        exercises_chair
        + exercises_bottle
        + exercises_backpack
        + exercises_desk
        + exercises_none
    )

    db.add_all(all_exercises)
    db.commit()

    object_map = {
        chair: exercises_chair,
        bottle: exercises_bottle,
        backpack: exercises_backpack,
        desk: exercises_desk,
        none_obj: exercises_none,
    }

    for obj, ex_list in object_map.items():
        for ex in ex_list:
            db.add(ObjectExercise(object_id=obj.id, exercise_id=ex.id))

    db.commit()
    db.close()
    print("Database seeded successfully!")


if __name__ == "__main__":
    seed()
