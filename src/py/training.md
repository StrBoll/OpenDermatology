#Defining a 2 Dimensional Convolutional Neural Network:

#self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size, stride, padding);
    

# in_channels parameter represents the number of input channels to the convolutional layer. 
# specifically for processing images, if we have a grayscale image we would use 1 since each pixel only has 1 intensity value 
# if it were an RGB image we would use 3 

#out_channels parameter represents the number of output channels, can also be called filters or a feature map
# Each of the filters in the out_channel parameter (32 in this case) detects unique features like:
# edges, textures, shapes
# 32 means that the layer will learn 32 different filters total. Which will output 32 feature maps for each input image
# more feature maps means more complexity and better AI 

#kernel_size represents the size of the filter or kernel (names are interchangeable)
# The filter is slid over the input image
# kernels are defined in square-like parameters so if a kernel is a size 3 then its a 3 x 3 filter

# A 3 x 3 kernel will look through a 3 x 3 section of pixels on each iteration during training. 


#stride represents how much the filter moves after each step when moving across the image during training
# essentially controls how fast your training happens
# a stride of 1 would mean the filter moves one pixel at a time horizontally and vertically
# a smaller stride (like 1) means greater overlap between positions of the filter and a larger output feature map
# A larger stride (like 2) means it skips more pixels and gives us a smaller output feature map

#padding represents how much the input image is padded with zeros around the borders before convolution is applied
# Convolution is the sliding of the filter across the image to produce the feature map 
# Without padding, the output size would be reduced after each convolution. 
# Padding lets us preserve the dimensions of the input / reduce shrinking 
# Using a kernel of size 3 and a padding of 1 would keep the output the same size as the input, letting us focus properly on the edge pixels





# So how can we determine which numbers to use for these parameters?


# For input and output channels, the input depends on if its grayscale (1) or RGB (3) like pixel channels. 
# For output specifically, the more filters we use, the greater the computational cost. However, it will increase the capture of features and lead to better trained models
# typically people start at 32 or 64, then increase by factors of 2 to for example 128 and 256 and so on and so forth

# For kernel size, 3x3 and 5x5 are the most common. I don't know why, thats just the way it is. 3x3 is the most widely used in modern architectures so its probably best to stick with that 
# What we know: Larger kernels capture more patterns, but also increase computational cost and are prone to overfitting which skews results


# stride is the most commonly used setting since it lets the kermel slide over every pixel to capture a wider amount of granular info
# Setting stride to 2 will reduce the computational cost and speed up the process, but sacrifices detail
# larger strides are generally used for downsampling

# padding is most commonly only seen used in 3 x 3 kernels since it could skip over some pixels. 
# Setting padding to 0 instead of 1 would be called a "valid" convolution, it reduces the output size and convolution kernel wont apply on the borders
# This would be most preferable for a case where we have black borders on all our images that we want to ignore 





# Experimenting with hyperparameter tuning

# Grid search and random search are two places to start when trying to optimize your parameters
# Grid search looks at all the possible combinations of a set of hyperparameters while random search picks random combinations

# You can actually automate hyperparameter tuning using a special library like Hyperopt or Optuna 
# These libraries essentially use an "intelligent" search to find the best parameters for the model




# Best recommendations: Start Simple before you increase complexity
# Start with a simple architecture for your model, this means for example 32 filters, 3x3 kernels, stride=1 and padding=1. You adjust them as you train. 

# If we get lazy we can always use a popular pre-trained model as reference like VGG which also uses a 3x3 convo layers. 








# Key Hyperparameters in CNN Training: 


# 1. Learning Rate
# 2. Batch Size
# 3. Epochs count
# 4. Momentum
# 5. Dropout Rate
# 6. Optimizer (SGD, Adam, etc)
# 7. Weight Decay (L2 Regularization)


# How we optimize these parameters for our projects:




# Learning Rate:
# Learning Rate controls how large the updates to the model's weight are during the training.
# Weights can be defined as the parameter which determines the influence or importance of each specific neuron. 
# Basically, it decide which neurons should have more influence over the results of the training, since neurons connect to one another in each layer of the network, each connection has a weight between them to decide the influence from one neuron to the next
# When an image (in our case) is passed through the neural network, the input values are multiplied by the corresponding weights in the connections between neurons
# Those weights are added together, the results go to the activation function (separate) which decides whether or not a neuron should even activate, and if it should, by how much 
# Deciding how much each neuron contributes to our results
# I would say an example for our project would be if one neuron possess a 3 x 3 area of plain skin on someone's arm, that would be considered a less weighted neuron in the neural network compared to a neuron that had a 3 x 3 area of a pimple for example 

# Learning Rate:
# One of the most important hyperparameters. It rules over how fast and stable the training process is. 
# After each iteration, the optimizer we choose to use will adjust the weights in the model based off of the calculated loss gradient

#Learning Rate:
# Best practices are to start with a small value such as 0.001 or 0.0001. 
# If training becomes unstable (like a large oscillation of loss) its best practice to lower it slowly 
# Of course, the lower this number the slower the training will go. 
# The most common ranges are between 0.0001 and 0.01 
# If learning rate is set too high, it might jump around without decreasing loss gradient. (it wont converge) 
# If learning rate is set too low, it could be so slow that it gets stuck in a crawl




# Batch Size 
# Batch Size represents the number of training samples that our model will processs before it updates the weights with the optimizer
# Updating the model after each sample would take too long, while updating after all sample would not fit into our memory
# Instead, we split the dataset into a smaller number of batches 

# Ways to optimize Batch Size
# Smaller Batch sizes such as 32 and 64 usually output better generalized results due to the randomness of gradient updates (covers more ground more often)
# Larger sizes like 128 and 256 converge faster, but are more prone to overfitting and require a larger amount of memory
# Best practice is to start around a happy medium, like 64 or 128 and either decrease or increase
# If training becomes too slow or runs out of memory on your machine, you should reduce the batch size 




# Epoch Count
# The number of epochs in a complete pass throghout the whole training dataset. Like, passing through the whole MNIST data set of images 
# This number will determine how many times the model will see the entire dataset while training 

# Ways to optimize Epoch Count
# Start smaller around 5 to 10 epochs. Monitor the validation accuracy as well as the loss gradient
# A common way of telling if the model is overfitting, meaning seeing it too much, is if the performance of the model stops improving
# Overfitting is when you have good performance on your data set but poor performance on the validation set 
# Validation set is like the images you would set aside to test out the model, you don't feed the validation set to your model during training 
# A common sign of Underfitting is when the model gets more accurate but hasn't reached its plateu during training
# In the case of underfitting, you would just increase the number of epochs
# One good practice is called "Early Stopping"
# Early Stopping involves stopping the training process when validation accuracy stops improving, this avoids training too much too long 




